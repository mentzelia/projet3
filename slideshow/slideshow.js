/* cod javascript slider */

var Slider = {
    //Initialisation slider
    init : function (ensbleSlides, buttonLeft, buttonRight, buttonPause) {
        this.ensbleSlides = ensbleSlides;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.buttonPause = buttonPause;
    },

    //Description du mecanisme de fonctionnement du slider
    slide: function() {
        
        //Définition et affichage 1ere slide
        var slideIndex = 1;
        showDivs(slideIndex);


        //fonction qui affiche la diapo demandée (selon index) et cache les autres
        this.ensbleSlides = ensbleSlides;

        function showDivs(n) {
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

            $(this.ensbleSlides[slideIndex - 1]).show();
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
        this.buttonLeft;
        this.buttonRight;

        this.buttonLeft.click(left);
        this.buttonRight.click(right);



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
         }; 
    };

};

var slider1 = Object.create(Slider);

slider1.init($(".elements_slide_slider1"),$("#button_left"),$("#button_right"),$(".fa-pause"));

slider1.slide();



    
    


