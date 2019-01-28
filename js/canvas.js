var Canvas = {
    init: function(canvas, color, line, saveButton, clearButton) {
        //mise en place du canva
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext("2d");// retourne un context de dessin
        this.context.strokeStyle = color;//defini couleur ou style -> color, gradient ou pattern
        this.context.lineWidth = line;//epaisseur du trait
        this.saveButton = document.getElementById(saveButton);
        this.clearButton = document.getElementById(clearButton);
        
        //gestion souris -> au départ ne dessine pas, situé en haut à gauche
        this.draw = false;
        this.positionSourisDepart = {x:0, y:0};
        this.lastPosition = this.positionSourisDepart;

        this.evenementSouris();
        this.rafraichissementEcran();
        this.animationBoucle();
        this.evenementDoigt();
        this.clearCanvas();
        this.saveCanvas();
        
    },
    
    //gestion de la souris
    evenementSouris: function() {
        this.canvas.addEventListener("mousedown", function(e) {
            this.draw = true;
            this.lastPosition = this.getMousePosition(this.canvas, e);   
        }.bind(this), false); //useCapture ->false permet compatibilité tous navigateurs
        
        this.canvas.addEventListener("mouseup", function(e) {
            this.draw =false;
        }.bind(this), false);
        
        this.canvas.addEventListener("mousemove", function(e) {
            this.positionSourisDepart= this.getMousePosition(this.canvas, e);
            
        }.bind(this), false);
    },

    //obtenir la position de la souris sur le canva
    getMousePosition: function(canvasDOM, mouseEvent) {
        var rectangle = canvasDOM.getBoundingClientRect();// renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage (viewport) 
        
        return {
            x: mouseEvent.clientX - rectangle.left,
            y: mouseEvent.clientY - rectangle.top,
        };// retourne la position sous un objet, client X retourne coordonnée horizontale dans un canva. en haut sera toujours à 0, client Y coord verticale dans un canva. a gauche toujours à 0.
    },
    
    // on a besoin de rafraichir l'écran régulierement pour voir apparaitre le tracé -  si navigateur non compatible plusieurs possibilités d'animation -> cf developper mozilla
    rafraichissementEcran: function() {
        window.ecranRafraichi = (function (callback) {
                return window.requestAnimationFrame || // Firefox 23 / IE 10 / Chrome / Safari 7 (incl. iOS)
                window.webkitRequestAnimationFrame || //pour anciennes versions de Safari / Chrome
                window.mozRequestAnimationFrame || //pour Firefox < 23
                window.oRequestAnimationFrame || //pour Opéra
                window.msRequestAnimationFrame || //IE
                function (callback) {
                    window.setTimeout(callback, 1000/60);
                };
        })();
    },


    // Animation fonction auto appelée
    animationBoucle: function() {
        var self = this;
        (function dessinAnime () {
          ecranRafraichi(dessinAnime);
          self.dessinSurCanvas();
        })();
    },
    
    // Fonction dessiner
    dessinSurCanvas: function() {
      if (this.draw) {
        //this.context.beginPath(); //pour démarrer un nouveau dessin
        this.context.moveTo(this.lastPosition.x, this.lastPosition.y);//point de départ
        this.context.lineTo(this.positionSourisDepart.x, this.positionSourisDepart.y);//point d'arrivée
        this.context.stroke();//methode qui dessine avec style attribué
        this.lastPosition = this.positionSourisDepart;
        sessionStorage.setItem("canvaEnregistre", "true"); //enregistre booléen pour suivi reservation
      };
    },

    //Gestion du doigt pour tablette et mobile
    evenementDoigt: function() {
        this.canvas.addEventListener("touchstart", function (e) {
            sessionStorage.setItem("canvaEnregistre", "true");
            
            if (e.target === this.canvas) {
                //si ce qui a declenché l'évènement est le canva
                e.preventDefault();
            };//fixe le canva pour qu'il ne bouge pas avec le doigt -> cf doc mozilla developper
            
            this.positionSourisDepart = this.getTouchPosition(this.canvas, e);
            var touch = e.touches[0]; //c'est le 1er toucher tactile
            var mouseEvent = new MouseEvent("mousedown", { //conversion touch en mouse
            clientX: touch.clientX,
            clientY: touch.clientY,
            });
            this.canvas.dispatchEvent(mouseEvent); //déclenche sur le canva l'évenement mouseEvent passé en paramètre
        }.bind(this), false);

        this.canvas.addEventListener("touchend", function (e) {
            if (e.target === this.canvas) {
                e.preventDefault();
            };
            
            var mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(mouseEvent);
            }.bind(this), false);

        this.canvas.addEventListener("touchmove", function (e) {
            if (e.target === this.canvas) {
            e.preventDefault();
            };
            
            var touch = e.touches[0]; 
            var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }.bind(this), false);
    },
    
    //Position du doigt sur le canvas
    getTouchPosition: function (canvasDom, touchEvent) {
      var rectangle = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rectangle.left,
        y: touchEvent.touches[0].clientY - rectangle.top,
      };
    },
    
    //Reinitialiser le canva
    clearCanvas: function () {
        this.clearButton.addEventListener("click", function() {
            this.canvaReset(); 
            }.bind(this));
        },
    
    canvaReset: function () {
        this.canvas.width = this.canvas.width; //seul moyen est de reinitialiser la width
        sessionStorage.setItem("canvaEnregistre", "false");
    },
    
    
    //enregistrer en data Url
    saveCanvas: function() {
        this.saveButton.addEventListener("click", function () {
            var image = document.getElementById("imageSignature");
            
            var dataUrl = this.canvas.toDataURL(); //methode qui enregistre la signature du canva en image
            image.src = dataUrl;
            sessionStorage.setItem("signature", dataUrl);
            image.style.display = "block";
        }.bind(this));
    },
    
    
   
};











