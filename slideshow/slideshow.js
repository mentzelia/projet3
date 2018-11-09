/* cod javascript slider */

//Définition et affichage 1ere slide
var slideIndex = 1;
showDivs(slideIndex);

//fonction qui affiche la diapo demandée (selon index) et cache les autres
function showDivs(n) {
    var i;
    var ensbleSlides = document.getElementsByClassName("elements_slide_slider1");
    //si l'index est > au nombre d'élements -> remise à zero, sinon affiche la slide demandée
    if (n > ensbleSlides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = ensbleSlides.length} ;
    for (i = 0; i < ensbleSlides.length; i++) {
        ensbleSlides[i].style.display = "none"; 
    }
    ensbleSlides[slideIndex-1].style.display = "block"; 
}

//Fonction pour faire défiler manuellement le slider
function plusDivs(n) {
    showDivs(slideIndex += n);
}

//définition d'une fonction supplémentaire spécifique (+1, -1) pour l'intégrer ensuite dans un évenement
function left(){
    plusDivs(-1);
}

function right(){
    plusDivs(+1);
}



//Déplacement au clic fleches droite et gauche de l'écran
var buttonLeft = document.getElementById("button_left");
var buttonRight = document.getElementById("button_right");

buttonLeft.addEventListener("click", left);
buttonRight.addEventListener("click", right);



//Déplacement slider aux touches fleches droite et gauche clavier
document.addEventListener("keydown", function(){
    if(event.keyCode==37){
        left();
    }
});

document.addEventListener("keydown", function(){
    if(event.keyCode==39){
        right();
    }
});