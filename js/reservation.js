var ObjetReservation = {
        init: function(reservationButtonId, objetCarte){
        this.timer = Object.create(Timer);
        this.boutonReservation = document.getElementById(reservationButtonId);
        this.objetCarte = objetCarte //objet reservation est lié à la carte pour recup ses infos
        this.nom = null;
        this.prenom = null;
        this.detailNomStation = null;
        this.elementHtmlSection = null;
        this.gestionStorage(); 
        this.verifReservationEnCours();
        this.gestionnaireReservation();
        //A l'enregistrement du canva, lancer le timer
        this.gestionnaireTimer();
        
        
    },
    
    gestionStorage: function() {
        document.getElementById("prenom").value = localStorage.getItem("prenom");
        document.getElementById("nom").value = localStorage.getItem("nom");
    },
    
     verifReservationEnCours: function(){    
            
        //Vérification si une réservation a déja été faite et si c'est le cas alors affichage timer rafraichi (notamment pour rafraichissement navigateur)
        if (sessionStorage.getItem("statutReservation")=== "true"){
            this.apparitionTexteTimer();
            this.creationTimerRafraichi();
        
        } else {
        
            this.ajoutReservation();
            
            
        }; 
    },
    
    gestionnaireReservation: function(){
        this.boutonReservation.addEventListener('click', function(e){
            e.preventDefault(); //empêche le navigateur de rafraichir
            
            this.prenom = document.getElementById("prenom");
            this.nom = document.getElementById("nom");
            this.detailNomStation = document.getElementById( "detailNomStation");
            
            if (sessionStorage.getItem("statutReservation") === null || sessionStorage.getItem("statutReservation") === "false") {
                
                this.ajoutReservation();
                
            }else{
                
                if(window.confirm("Vous êtes sur le point d'annuler votre réservation. Souhaitez-vous annuler et créer une nouvelle réservation?")) {
                    clearInterval(this.timer.currentTimer);
                    document.getElementById("timer").textContent = " ";
                    
                    sessionStorage.setItem("statutReservation", false);
                    sessionStorage.setItem("canvaEnregistre", "false");
                
                    this.ajoutReservation();
                    
                } else {
                    
                    //rafraichir le timer
                    clearInterval(this.timer.currentTimer);
                    document.getElementById("timer").textContent = " ";
                    this.apparitionTexteTimer();
                    this.creationTimerRafraichi(); 
                    
                };
            };
        }.bind(this))
    },
    
    ajoutReservation: function(){        
        if (this.objetCarte.statut !== null) {
            if (this.objetCarte.statut === "OUVERT") {
                if (this.objetCarte.disponibilite === "OK") {
                    if (this.nom.value.length !==0) {
                        if (this.prenom.value.length !==0) {
                            document.getElementById("texteErreur").textContent = " ";
                            
                            //nom et prénom gardés en mémoire pour prochaine reservation
                            localStorage.setItem("prenom", prenom.value);
                            localStorage.setItem("nom", nom.value);
                            
                            //création du canvas
                            //document.getElementById("imageSignature").style.display = "none";
                            var canvas1 = Object.create(Canvas);
                            canvas1.init("canvas", "#000", "1", "save", "clear");
                            canvas1.canvaReset();
                            
                            //Apparition section canva
                            document.getElementById("signatureDiv").style.display = "flex";

                        } else {
                            document.getElementById("texteErreur").textContent = "Veuillez renseigner votre prénom.";
                        }
                    } else {
                        document.getElementById("texteErreur").textContent = "Veuillez renseigner votre nom.";
                    }
                } else {
                    document.getElementById("texteErreur").textContent = "Il n'y a plus de vélos disponibles. Veuillez sélectionner une autre station.";
                }
            } else {
                document.getElementById("texteErreur").textContent = "Cette station n'est pas disponible. Veuillez en sélectionner une autre.";
            }
        } else {
            document.getElementById("texteErreur").textContent = "Veuillez sélectionner une station.";
        }
    },
    
    gestionnaireTimer: function(){
        document.getElementById("save").addEventListener("click", function(e) { 
            
            if(sessionStorage.getItem("canvaEnregistre") === "false" || sessionStorage.getItem("canvaEnregistre") === null) {
                document.getElementById("texteErreur").textContent = "Veuillez signer pour valider votre réservation.";
                
            } else {  
                
                var img = document.getElementById("imageSignature");
                
                //enregistre temporairement signature + reservation (timer)
                sessionStorage.setItem("signature", img.src);
                console.log(img.src);
                
                //enregistrer date d'expiration de la reservation
                var dateClic = new Date();
                var dateExpiration = new Date (dateClic);
                dateExpiration.setMinutes(dateClic.getMinutes() + 20);
                sessionStorage.setItem("dateExp", dateExpiration);

                //texte timer
                document.getElementById("texteErreur").textContent = " ";
                this.apparitionTexteTimer();

                //Objet timer
                this.timer.init(20, 0);

                //intégrer statut de la réservation dans SessionStorage pour verifier statut au prochain clic Reserver
                sessionStorage.setItem("statutReservation", true);
                
                var sectionCanva = document.getElementById("signatureDiv");
                sectionCanva.style.display = "none";
            };
        
            
            
        }.bind(this));
    },
    
    apparitionTexteTimer: function () {
        this.prenom = document.getElementById("prenom");
        this.nom = document.getElementById("nom");
        this.detailNomStation = document.getElementById( "detailNomStation");
        
        if(sessionStorage.getItem("statutReservation") === "true"){
            //en cas de rafraichissement, évite que le sessionStorage ne soit écrasé par un textContent vide
            
        } else {
            
            sessionStorage.setItem("nomStation",this.detailNomStation.textContent);
        }; 
            
        //texte timer
        document.getElementById("timer").style.display = "flex";  
        this.elementHtmlSection = null;
        this.elementHtmlSection = document.getElementById("timer");
        var texteReservation = document.createElement("p");
        texteReservation.id = "reservation";
        texteReservation.textContent = "Vélo réservé à la station "+ sessionStorage.getItem("nomStation") +" par " + this.prenom.value + " " + this.nom.value + "." + "Votre réservation expire dans ";
        this.elementHtmlSection.appendChild(texteReservation);
    },
    
    creationTimerRafraichi: function() {
        //Récupération Date d'expiration réservation
        var dateExpiration = Date.parse(sessionStorage.getItem("dateExp")); // dateExp est un string dans session Storage. Transforme en Date le string dateExp.

        //Date rafraichissement
        var dateRafraichissement = new Date();

        var tpsRestantEnSeconde = (dateExpiration-dateRafraichissement)/1000; // De base en mS d'ou transfo en sec

        var minRestante = Math.floor(tpsRestantEnSeconde/60); // nombre entier
        var secRestante = Math.floor(tpsRestantEnSeconde%60); // modulo permet calcul restant d'une division


        //Creation objet Timer lors du rafraichissement de la page    
        this.timer.init(minRestante, secRestante);
    },
    
    
};