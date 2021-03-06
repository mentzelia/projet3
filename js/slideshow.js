var Slider = {
    //donner une valeur nulle aux propriétés
    ensbleSlides: null,
    buttonLeft: null,
    buttonRight: null,
    buttonPause: null,
    buttonPlay: null,
    slideIndex: 0,
    timer: null,
    duration: 5000,

    init : function (ensbleSlides, buttonLeft, buttonRight, buttonPause, buttonPlay, duration) {

        this.ensbleSlides = ensbleSlides;
        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;
        this.buttonPause = buttonPause;
        this.buttonPlay = buttonPlay;
        if(duration){
            this.duration = duration;
        }
        
        this.slide(); 
        this.slideClavier();
    },

    slide: function() {
        this.buttonPlay.hide();
        this.showDivs(this.slideIndex);//creation slider
        this.buttonRight[0].addEventListener("click", this.right.bind(this));//bind permet de garder lien à right et pas au buttonRight - ne fonctionne pas avec jQuery - indice car considéré comme un tableau
        this.buttonLeft[0].addEventListener("click", this.left.bind(this));
        this.initCaroussel();//automatisation slider + play/pause
    },

    showDivs: function (n) {
        //si l'index de la slide est > au nombre d'élements -> remise à zero, sinon affiche la slide demandée
        if ( n > this.ensbleSlides.length) {
            this.slideIndex = 1
        };
        //si on est à la 1ere slide permet un retour à la dernière
        if (n < 1) {
            this.slideIndex = this.ensbleSlides.length
        };
        
        //on cache toutes les images
        for (var i = 0; i < this.ensbleSlides.length; i++) {
            $(this.ensbleSlides[i]).hide(); 
        };
        
        //affichage de la diapo concernée
        $(this.ensbleSlides[this.slideIndex - 1]).show();
        //slideIndex-1 = pour ajuster le chiffre de la diapo en tableau au chiffre du slideIndex qui n'est pas sous format tableau
    },

    //Fonction pour faire défiler manuellement le slider
    plusDivs: function(n) {
        this.showDivs(this.slideIndex += n);
    },

    //définition d'une fonction supplémentaire spécifique (+1, -1) pour l'intégrer ensuite dans un évenement au clic
    left: function(){
        this.plusDivs(-1);
    },

    right: function(){
        this.plusDivs(+1);
    },
    
    //initialisation, lance le carousel, gestion des boutons play/pause
    initCaroussel: function(){
        this.carousel();
        this.buttonPause.click(this.stopDefil.bind(this));//bind pour lier this à la methode et non au boutonPause
        this.buttonPlay.click(this.playDefil.bind(this));
    },
    
    carousel: function() {    
        this.right(); 
        this.timer = setTimeout(this.carousel.bind(this), this.duration); 
    },

    //permet de stopper le slider et modif aparition des boutons
    stopDefil: function() {
        clearTimeout(this.timer);
        this.buttonPlay.show();
        this.buttonPause.hide();
    },

    //permet de relancer le slider et modif aparition des boutons
    playDefil: function() {
        setTimeout(this.carousel.bind(this), this.duration);
        this.buttonPlay.hide();
        this.buttonPause.show();
    },
    
    //Fonction pour slider avec le clavier - obligé de rester en procedural, jQuery ne passe pas
    slideClavier: function(){
        document.addEventListener("keydown", function(event){
            if(event.keyCode===37){
                this.left();
            }else{
                if(event.keyCode===39){
                    this.right();
                }
            }
        }.bind(this));
    }

};


    
                    




