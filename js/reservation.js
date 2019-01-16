//1- Objet Texte Reservation
var TexteReservation= {
    init: function(elementHtmlSection) {
        this.elementHtmlSection = elementHtmlSection;
        this.ajoutElement();
    },

    ajoutElement: function() {
        var New = document.createElement("p");
        New.id = "reservation";
        New.textContent = "Vélo réservé à la station "+ document.getElementById("detailNomStation").textContent +" par " + prenom.value + " " + nom.value + "." + "Votre réservation expire dans ";
        this.elementHtmlSection.appendChild(New);
    },
};



//2- Objet Recup Infos local et Session Storage:
var RecupInfoStorage ={
    init: function(prenom, nom){
        this.prenom = document.getElementById(prenom);
        this.nom = document.getElementById(nom);
        
        this.recupLocalStorage(prenom, nom);
        this.recupSessionStorage();
        
    },
    
    //Champs préremplis à l'ouverture du navigateur si a déjà été rempli une fois
    recupLocalStorage: function(prenom, nom){
        this.prenom.value = localStorage.getItem("prenom");
        this.nom.value = localStorage.getItem("nom");    
    },
    
    //Vérification si une réservation a déja été faite et si c'est le cas alors affichage du timer et de la signature. Impossible de faire nouvelle réservation.
    recupSessionStorage: function(){
       this.signatureReservation = sessionStorage.getItem("signature"); 
    },
    
};

var recupInfoStorage1 = Object.create(RecupInfoStorage);
recupInfoStorage1.init("prenom", "nom");




//3- Mecanisme d'enclenchement de la reservations selon conditions de verifications établies
var GestionnaireReservation = {
    init: function(button, imageSignature, timer, prenom, nom, adresse, texteErreur, save){
        this.button = document.getElementById(button);
        this.image = document.getElementById(imageSignature);
        this.elementHtmlSection = document.getElementById(timer);
        this.prenom = document.getElementById(prenom);
        this.nom = document.getElementById(nom);
        this.adresse = document.getElementById(adresse);
        this.texteErreur = document.getElementById(texteErreur);
        this.saveButton = document.getElementById(save);
        
        
        
        this.lancementReservation(button);        
    },
    
    lancementReservation: function(button) {
        if (sessionStorage.getItem("statutReservation")=== "true"){
            this.button.addEventListener("click", function(e) {
                e.preventDefault();
            }.bind(this));
            
            //Affichage Image signature sauvegardée dans session Storage
            this.image.src = this.signatureReservation;
            
            //Objet texte reservation au rafraichissement navigateur
            this.elementHtmlSection.style.display = "flex";
            this.reservationRafraichie = Object.create(TexteReservation);
            this.reservationRafraichie.init(this.elementHtmlSection);
    
            //Récupération Date d'expiration réservation
            this.dateExpiration = Date.parse(sessionStorage.getItem("dateExp")); // dateExp est un string dans session Storage. Transforme en Date le string dateExp.
            
            //Date raffraichissement
            this.dateRafraichissement = new Date();

            this.tpsRestantEnSeconde = (this.dateExpiration-this.dateRafraichissement)/1000; // De base en mS d'ou transfo en sec

            this.minRestante = Math.floor(this.tpsRestantEnSeconde/60); // nombre entier
            this.secRestante = Math.floor(this.tpsRestantEnSeconde%60); // modulo permet calcul restant d'une division

            console.log("il reste "+ this.minRestante+"min et "+ this.secRestante+"sec.");

            //Creation objet Timer lors du rafraichissement de la page    
            this.timerRafraichi = Object.create(Timer);
            this.timerRafraichi.init(this.minRestante, this.secRestante);
    
        } else {
            
            //Au clic sur Réserver: vérifie conditions + ouvre fenetre signature + enregistre données Nom/Prénom pour prochaine fois
            this.button.addEventListener("click", function(e) {
                e.preventDefault(); //empêche le navigateur de rafraichir

                if (sessionStorage.getItem("statutReservation") === null || sessionStorage.getItem("statutReservation") === "false") { 
                    if (statut !== null) { 
                        if (statut === "OUVERT") { 
                            if (disponibilite === "OK") { 
                                if (this.nom.value.length !==0) {
                                    if (this.prenom.value.length !==0) {
                                        this.texteErreur.textContent = " ";
                                        //nom et prénom gardés en mémoire pour prochaine reservation

                                        localStorage.setItem("prenom", this.prenom.value);
                                        localStorage.setItem("nom", this.nom.value);

                                        //Apparition section canva
                                        document.getElementById("signatureDiv").style.display = "flex";

                                    } else {
                                        this.texteErreur.textContent = "Veuillez renseigner votre prénom.";
                                    }
                                } else {
                                    this.texteErreur.textContent = "Veuillez renseigner votre nom."; 
                                } 
                            } else {
                                this.texteErreur.textContent = "Il n'y a plus de vélos disponibles. Veuillez sélectionner une autre station.";   
                            }
                        } else {
                            this.texteErreur.textContent = "Cette station n'est pas disponible. Veuillez en sélectionner une autre.";
                        }
                    } else {
                        this.texteErreur.textContent = "Erreur. Veuillez sélectionner une station.";
                    };
                }else {
                    console.log("Réservation en cours");
                    //il y a le timer en cours qui est sur la section de texte et qui se décompte 
                };

            }.bind(this));
            
            //Appel canva, timer + texte
            this.canvas1 = Object.create(Canvas);
            this.canvas1.init("canvas", "#000", "1", "save", "clear", "signatureDiv");

            this.saveButton.addEventListener("click", function(e) {
                this.elementHtmlSection.style.display= "flex";

                //enregistre temporairement signature + reservation (timer)
                sessionStorage.setItem("signature", this.image.src);

                //enregistrer date d'expiration de la reservation
                this.dateClic = new Date();
                this.dateExpiration = new Date (this.dateClic);
                this.dateExpiration.setMinutes(this.dateClic.getMinutes() + 20);
                sessionStorage.setItem("dateExp", this.dateExpiration);

                //Objet texte reservation
                this.reservation1 = Object.create(TexteReservation);
                this.reservation1.init(this.elementHtmlSection);

                //Objet timer
                this.timer1 = Object.create(Timer);
                this.timer1.init(1, 0);

                //intégrer statut de la réservation dans SessionStorage pour pouvoir verifier statut au prochain clic Reserver
                sessionStorage.setItem("statutReservation", true);
            }.bind(this));
               
        };
    
    },
};

var gestionnaireReservation1 = Object.create(GestionnaireReservation);
gestionnaireReservation1.init("button", "imageSignature", "timer", "prenom", "nom", "adresse", "texteErreur", "save");


            
            
            
