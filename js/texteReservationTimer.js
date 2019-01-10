//Objet texte timer
var Reservation= {
    init: function(elementHtmlSection) {
        this.elementHtmlSection = elementHtmlSection;
        this.ajoutElement();
    },

    ajoutElement: function() {
        console.log(document.getElementById("nomStation"));
        var New = document.createElement("p");
        New.id = "reservation";
        New.textContent = "Vélo réservé à la station "+ document.getElementById("detailNomStation").textContent +" par " + prenom.value + " " + nom.value + "." + "Votre réservation expire dans ";
        this.elementHtmlSection.appendChild(New);
    },
} ;


                                             

