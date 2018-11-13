/* cod javascript slider */

//Définition et affichage 1ere slide
var slideIndex = 1;
showDivs(slideIndex);


//fonction qui affiche la diapo demandée (selon index) et cache les autres
var ensbleSlides = ensbleSlides;

function showDivs(n) {
    var i;
    var ensbleSlides = $(".elements_slide_slider1");
    //si l'index est > au nombre d'élements -> remise à zero, sinon affiche la slide demandée
    if (n > ensbleSlides.length) {
        slideIndex = 1
    };
    //si on est à la 1ere slide retour à la dernière
    if (n < 1) {
        slideIndex = ensbleSlides.length
    };
    for (i = 0; i < ensbleSlides.length; i++) {
        $(ensbleSlides[i]).hide(); 
    };
    
    $(ensbleSlides[slideIndex - 1]).show();
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
var buttonLeft = $("#button_left");
var buttonRight = $("#button_right");

buttonLeft.click(left);
buttonRight.click(right);



//Déplacement slider aux touches fleches droite et gauche clavier
function keydownLeft(){
    if(event.keyCode==37){
        left();
    }
};

function keydownRight(){
    if(event.keyCode==39){
        right();
    }
};

$("html").keydown(keydownRight);
$("html").keydown(keydownLeft);

//Fonction défilement automatique
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var ensbleSlides = $(".elements_slide_slider1");
    for (i = 0; i < ensbleSlides.length; i++) {
      $(ensbleSlides[i]).hide(); 
    };
    
    slideIndex++;
    if (slideIndex > ensbleSlides.length) {slideIndex = 1}; 
    
    setTimeout(carousel, 5000); // passe suivante toutes les 5s
    $(ensbleSlides[slideIndex - 1]).fadeIn(1000); 
    $(ensbleSlides[slideIndex - 1]).delay(3000).fadeOut(1000);

}; 

    //Gestion bouton pause
    var buttonPause= $(".fa-pause");

    var sourisPause = buttonPause.hover(stopDefil, playDefil);
    function stopDefil() {console.log("test entree");};
    function playDefil() {console.log("test sortie");};


   
    
    


