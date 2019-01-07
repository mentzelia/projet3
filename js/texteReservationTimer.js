//Objet texte timer
var Reservation= {
    init: function(elementHtmlSection) {
        this.elementHtmlSection = elementHtmlSection;
        this.ajoutElement();
    },

    ajoutElement: function() {
        var New = document.createElement("p");
        New.id = "reservation";
        New.textContent = "Vélo réservé à la station "+ statut +" par " + prenom.value + " " + nom.value + "." + "Votre réservation expire dans ";
        this.elementHtmlSection.appendChild(New);
    },
} ;

//Objet texte timer
var elementHtmlSection = document.getElementById("timer"); 
var reservation1 = Object.create(Reservation);
reservation1.init(elementHtmlSection);
                                             

