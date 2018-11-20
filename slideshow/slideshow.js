//Definition de mon objet
var Slider = {
    //Definition fonction initialisation
     init: function(ensbleSlides, buttonLeft, buttonRight, buttonPause) {
            this.ensbleSlides = ensbleSlides;
            this.buttonLeft = buttonLeft;
            this.buttonRight = buttonRight;
            this.buttonPause = buttonPause;     
     },
    
    //Definition fonction slide
    slide: function() {

            //Définition et affichage 1ere slide
            var slideIndex = 1;
            this.showDivs(slideIndex);
            
            //Fonction pour faire défiler manuellement le slider
            this.plusDivs(slideIndex);
            //définition d'une fonction supplémentaire spécifique (+1, -1) pour l'intégrer ensuite dans un évenement
            this.left();
            this.right();

            //Déplacement au clic fleches droite et gauche de l'écran
            this.buttonLeft;
            this.buttonRight;

            this.buttonLeft.click(this.left);
            this.buttonRight.click(this.right);

/*
            //Déplacement slider aux touches fleches droite et gauche clavier
            this.keydownLeft();
            this.keydownRight();
        

            $("html").keydown(keydownRight);
            $("html").keydown(keydownLeft);
*/
            this.keydown();
        
            //Fonction défilement automatique
            var slideIndex = 0;
            //this.carousel();
    },

    //Definition fonction showDivs qui affiche la diapo demandée (selon index) et cache les autres au départ à 0
    showDivs: function(n) {
                var i;
                this.ensbleSlides;
                //si l'index est > au nombre d'élements -> remise à zero, sinon affiche la slide demandée
                if (n > this.ensbleSlides.length) {
                    slideIndex = 1
                };
                //si on est à la 1ere slide permet un retour à la dernière
                if (n < 1) {
                    slideIndex = this.ensbleSlides.length
                };
                for (i = 0; i < this.ensbleSlides.length; i++) {
                    $(this.ensbleSlides[i]).hide(); 
                };

                $(this.ensbleSlides[this.slideIndex - 1]).show();
    },

    //Definition fonction plusDivs
    plusDivs: function(n) {
                this.showDivs(this.slideIndex += n);
    },
    
    //Definition fonction left
    left: function(){
                Slider.plusDivs(-1);
    },

    //Definition fonction right
    right: function() {
                Slider.plusDivs(+1);
    },

    //Methode keydown
    
    keydown : function(){
        $("html").keypress( function(event){
            if(event.keyCode==37){
                    this.left();
                };
            if(event.keyCode==39){
                    this.right();
                };
        });   
},
    

    //Definition fonction carousel
    carousel: function() {
                var i;
                this.ensbleSlides;
                for (i = 0; i < this.ensbleSlides.length; i++) {
                  $(this.ensbleSlides[i]).hide(); 
                };

                slideIndex++;
                if (slideIndex > this.ensbleSlides.length) {slideIndex = 1}; 

                var timer = setTimeout(carousel, 5000); // passe suivante toutes les 5s

                $(this.ensbleSlides[slideIndex - 1]).fadeIn(2000); 
                $(this.ensbleSlides[slideIndex - 1]).delay(3000);


                //Gestion bouton pause
                this.buttonPause;

                var sourisPause = this.buttonPause.hover(stopDefil, playDefil);
                function stopDefil() {
                    clearTimeout(timer);
                };

                function playDefil() {
                    setTimeout(carousel, 500);
                };
    },

};


//Creation du nouvel objet
var slider1 = Object.create(Slider);
slider1.init($(".elements_slide_slider1"),$("#button_left"),$("#button_right"),$(".fa-pause"));
slider1.slide();




    
    