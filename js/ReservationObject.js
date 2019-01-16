var ReservationObject = {
    /* PARAMS
    Boutton de reservation id
    Map : Objet Carte lié à l'application
     */
    init: function(reservationButtonId, map){
        this.timer = Object.create(Timer);
        this.reservationBtn = document.getElementById(reservationButtonId);
        this.map = map
        this.nom = null;
        this.prenom = null;
        this.adresse = null;
        this.elementHtmlSection = null;
        this.reservationHandler();
    },
    reservationHandler: function(){
        console.log("hello loading");
        this.reservationBtn.addEventListener('click', function(e){
            console.log("hello Listener");
            this.prenom = document.getElementById("prenom");
            this.nom = document.getElementById("nom");
            this.adresse = document.getElementById("adresse");
            e.preventDefault(); //empêche le navigateur de rafraichir
            if (sessionStorage.getItem("statutReservation") === null || sessionStorage.getItem("statutReservation") === "false") {
                this.addReservation();
            }else{
                console.error("Réservation en cours")
                //TODO: CREER UNE ALERTE JS : SI IL CHOISIT RÉSERVER LANCER ADD RESERATION SINON ANNULER
            }
        }.bind(this))
    },
    addReservation: function(){
        if (this.map.statut !== null) {
            if (this.map.statut === "OUVERT") {
                if (this.map.disponibilite === "OK") {
                    if (this.nom.value.length !==0) {
                        if (this.prenom.value.length !==0) {
                            document.getElementById("texteErreur").textContent = " ";
                            //nom et prénom gardés en mémoire pour prochaine reservation

                            localStorage.setItem("prenom", prenom.value);
                            localStorage.setItem("nom", nom.value);
                            //création du canvas
                            var canvas1 = Object.create(Canvas);
                            canvas1.init("canvas", "#000", "1", "save", "clear", "signatureDiv");
                            this.saveCanvasHandler();
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
    saveCanvasHandler: function(){
        document.getElementById("save").addEventListener("click", function(e) {
            var img = document.getElementById("imageSignature");

            document.getElementById("timer").style.display= "flex";

            //enregistre temporairement signature + reservation (timer)
            sessionStorage.setItem("signature", img.src);

            //enregistrer date d'expiration de la reservation
            var dateClic = new Date();
            var dateExpiration = new Date (dateClic);
            dateExpiration.setMinutes(dateClic.getMinutes() + 20);
            sessionStorage.setItem("dateExp", dateExpiration);

            //Objet texte timer
            this.elementHtmlSection = document.getElementById("timer");
            var newResa = document.createElement("p");
            newResa.id = "reservation";
            newResa.textContent = "Vélo réservé à la station "+ this.adresse.textContent +" par " + this.prenom.value + " " + this.nom.value + "." + "Votre réservation expire dans ";
            this.elementHtmlSection.appendChild(newResa);
            //Objet timer

            this.timer.init(1, 0);

            //intégrer statut de la réservation dans SessionStorage pour verifier statut au prochain clic Reserver
            sessionStorage.setItem("statutReservation", true);
        }.bind(this));
    }
}