//Champs préremplis à l'ouverture du navigateur si a déjà été rempli une fois
document.getElementById("prenom").value = localStorage.getItem("prenom");
document.getElementById("nom").value = localStorage.getItem("nom");

//Vérification si une réservation a déja été faite et si c'est le cas alors affichage du timer et de la signature. Impossible de faire nouvelle réservation.
var signatureReservation = sessionStorage.getItem("signature");

if (signatureReservation !== null){
    document.getElementById("button").addEventListener("click", function(e) {
        e.preventDefault();
    });
        
    //Affichage Image signature sauvegardée dans session Storage
    var image = document.getElementById("imageSignature");
    image.src = signatureReservation;

    //Objet texte timer
    document.getElementById("timer").style.display = "flex";
    var elementHtmlSection = document.getElementById("timer"); 
    var reservation1 = Object.create(Reservation);
    reservation1.init(elementHtmlSection);

    //Creation objet Timer lors du rafraichissement de la page
    //var timerRafraichi = Object.create(Timer);
    //timerRafraichi.init(10, 0);
    
    var timerRafraichi = Object.create(Timer);
    timerRafraichi.init(10, 0);
    
} else {

    //Au clic sur Réserver: vérifie conditions + ouvre fenetre signature + enregistre données Nom/Prénom pour prochaine fois
    document.getElementById("button").addEventListener("click", function(e) {
        var prenom = document.getElementById("prenom");
        var nom = document.getElementById("nom");
        var adresse = document.getElementById("adresse");

        e.preventDefault(); //empêche le navigateur de rafraichir

        if (statut !== null) {     
            if (statut === "OUVERT") {
                if (disponibilite === "OK") {
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
        sessionStorage.setItem ("timer", timer);

        //Objet texte timer
        var elementHtmlSection = document.getElementById("timer"); 
        var reservation1 = Object.create(Reservation);
        reservation1.init(elementHtmlSection);

        //Objet timer
        var timer1 = Object.create(Timer);
        timer1.init(20, 0);
    });
}
