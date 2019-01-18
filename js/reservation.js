var ObjetReservation = {
        init: function(reservationButtonId, objetCarte){
        this.timer = Object.create(Timer);
        this.BoutonReservation = document.getElementById(reservationButtonId);
        this.objetCarte = objetCarte //objet reservation est lié à la carte pour recup ses infos
        this.nom = null;
        this.prenom = null;
        this.adresse = null;
        this.detailNomStation = null;
        this.elementHtmlSection = null;
        this.gestionStorage();
        this.gestionnaireReservation();
    },
    
    gestionStorage: function() {
        document.getElementById("prenom").value = localStorage.getItem("prenom");
        document.getElementById("nom").value = localStorage.getItem("nom");
    },
    
    gestionnaireReservation: function(){
        this.BoutonReservation.addEventListener('click', function(e){
            this.prenom = document.getElementById("prenom");
            this.nom = document.getElementById("nom");
            this.detailNomStation = document.getElementById( "detailNomStation");
            this.adresse = document.getElementById("adresse");
            e.preventDefault(); //empêche le navigateur de rafraichir
            if (sessionStorage.getItem("statutReservation") === null || sessionStorage.getItem("statutReservation") === "false") {
                this.ajoutReservation();
            }else{
                if(window.confirm("Vous êtes sur le point d'annuler votre réservation. Souhaitez-vous annuler et créer une nouvelle réservation?")) {
                    window.location.reload();// forcer rafraichissement navigateur
                    sessionStorage.setItem("statutReservation", false);
                } else {
                    //rafraichir le timer
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
                            var canvas1 = Object.create(Canvas);
                            canvas1.init("canvas", "#000", "1", "save", "clear", "signatureDiv");
                            
                            //A l'enregistrement du canva, lancer le timer
                            this.gestionnaireTimer();
                            
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
            document.getElementById("texteErreur").textContent = "Erreur. Veuillez sélectionner une station.";
        }
    },
    
    gestionnaireTimer: function(){
        document.getElementById("save").addEventListener("click", function(e) {
            
            if(document.getElementById("imageSignature").src === null) {
                document.getElementById("texteErreur").textContent = "Veuillez signer pour valider votre réservation.";
                
            } else {
                
                var img = document.getElementById("imageSignature");

                document.getElementById("timer").style.display= "flex";

                //enregistre temporairement signature + reservation (timer)
                sessionStorage.setItem("signature", img.src);

                //enregistrer date d'expiration de la reservation
                var dateClic = new Date();
                var dateExpiration = new Date (dateClic);
                dateExpiration.setMinutes(dateClic.getMinutes() + 20);
                sessionStorage.setItem("dateExp", dateExpiration);

                //texte timer
                this.elementHtmlSection = document.getElementById("timer");
                var texteReservation = document.createElement("p");
                texteReservation.id = "reservation";
                texteReservation.textContent = "Vélo réservé à la station "+ this.detailNomStation.textContent +" par " + this.prenom.value + " " + this.nom.value + "." + "Votre réservation expire dans ";
                this.elementHtmlSection.appendChild(texteReservation);

                //Objet timer
                this.timer.init(1, 0);

                //intégrer statut de la réservation dans SessionStorage pour verifier statut au prochain clic Reserver
                sessionStorage.setItem("statutReservation", true);
            };
            
            
        }.bind(this));
    },
};