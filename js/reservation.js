//Objet texte timer
var Reservation= {
    init: function(elementHtmlSection) {
        this.elementHtmlSection = elementHtmlSection;
        this.ajoutElement();
    },

    ajoutElement: function() {

        this.elementHtmlSection.appendChild(New);
    },
};


//Champs préremplis à l'ouverture du navigateur si a déjà été rempli une fois
document.getElementById("prenom").value = localStorage.getItem("prenom");
document.getElementById("nom").value = localStorage.getItem("nom");

//Vérification si une réservation a déja été faite et si c'est le cas alors affichage du timer et de la signature. Impossible de faire nouvelle réservation.
var signatureReservation = sessionStorage.getItem("signature");

if (sessionStorage.getItem("statutReservation")=== "true"){
    document.getElementById("button").addEventListener("click", function(e) {
        e.preventDefault();
    });
        
    //Affichage Image signature sauvegardée dans session Storage
    var image = document.getElementById("imageSignature");
    image.src = signatureReservation;

    //Objet texte timer
    document.getElementById("timer").style.display = "flex";
    var elementHtmlSection = document.getElementById("timer"); 
    var reservationRafraichie = Object.create(Reservation);
    reservationRafraichie.init(elementHtmlSection);
    
    //Récupération Date d'expiration réservation
    var dateExpiration = Date.parse(sessionStorage.getItem("dateExp")); // dateExp est un string dans session Storage. Transforme en Date le string dateExp.
    
    //Date raffraichissement
    var dateRafraichissement = new Date();
    
    var tpsRestantEnSeconde = (dateExpiration-dateRafraichissement)/1000; // De base en mS d'ou transfo en sec
    
    var minRestante = Math.floor(tpsRestantEnSeconde/60); // nombre entier
    var secRestante = Math.floor(tpsRestantEnSeconde%60); // modulo permet calcul restant d'une division
    
    console.log("il reste "+minRestante+"min et "+secRestante+"sec.");

    //Creation objet Timer lors du rafraichissement de la page    
    var timerRafraichi = Object.create(Timer);
    timerRafraichi.init(minRestante, secRestante);
    
} else {

    //Au clic sur Réserver: vérifie conditions + ouvre fenetre signature + enregistre données Nom/Prénom pour prochaine fois
    document.getElementById("button").addEventListener("click", function(e) {
        var prenom = document.getElementById("prenom");
        var nom = document.getElementById("nom");
        var adresse = document.getElementById("adresse");

        e.preventDefault(); //empêche le navigateur de rafraichir

        if (sessionStorage.getItem("statutReservation") === null || sessionStorage.getItem("statutReservation") === "false") { 
            if (carte1.statut !== null) {
                if (carte1.statut === "OUVERT") {
                    if (carte1.disponibilite === "OK") {
                        if (nom.value.length !==0) {
                            if (prenom.value.length !==0) {
                                document.getElementById("texteErreur").textContent = " ";
                                //nom et prénom gardés en mémoire pour prochaine reservation

                                localStorage.setItem("prenom", prenom.value);
                                localStorage.setItem("nom", nom.value);

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
            };
        }else {
            console.log("Réservation en cours");
            //il y a le timer en cours qui est sur la section de texte et qui se décompte 
        };

    });

    //Creation des objets

    //Objet canva
    var canvas1 = Object.create(Canvas);
    canvas1.init("canvas", "#000", "1", "save", "clear", "signatureDiv");

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
        var elementHtmlSection = document.getElementById("timer"); 
        var reservation1 = Object.create(Reservation);
        reservation1.init(elementHtmlSection);

        //Objet timer
        var timer1 = Object.create(Timer);
        timer1.init(1, 0);
        
        //intégrer statut de la réservation dans SessionStorage pour verifier statut au prochain clic Reserver
        sessionStorage.setItem("statutReservation", true);
    });
};