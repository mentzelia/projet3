//Objet timer
var Timer = { 
    init: function(minute, seconde) {
        
        
        this.ajoutMinuteDom(minute);
        this.ajoutSecondeDom(seconde);
        this.decompterSeconde();
        this.intervalRecurrent();
        this.interval = " ";
    },
    
    ajoutMinuteDom: function(minute) {
        var New = document.createElement("span");
        New.id = "timerMinute";
        New.textContent = minute;
        document.getElementById("reservation").appendChild(New);
        document.getElementById("reservation").insertAdjacentHTML("beforeend", " minutes et ");
    },
    
    ajoutSecondeDom: function(seconde) {
        var New = document.createElement("span");
        New.id = "timerSeconde";
        New.textContent = seconde;
        document.getElementById("reservation").appendChild(New);
        document.getElementById("reservation").insertAdjacentHTML("beforeend", " secondes.");
    },
    
    
    decompterSeconde: function() {
        var compteurSeconde = Number(document.getElementById("timerSeconde").textContent);
         console.log(compteurSeconde);
        var compteurMinute = Number(document.getElementById("timerMinute").textContent);
    
        if (compteurSeconde>0) {
            document.getElementById("timerSeconde").textContent = compteurSeconde-1;
        } else {
            if(compteurSeconde===0) {
                document.getElementById("timerSeconde").textContent= compteurSeconde+59;
                document.getElementById("timerMinute").textContent= compteurMinute-1;
            } 
        };

        if(compteurMinute===0 && compteurSeconde===0) {
                            clearInterval(this.currentTimer);
                           
                            alert("Votre réservation est expirée.");
                            
                            //au clic sur OK:
                            sessionStorage.setItem("statutReservation", false);
                            sessionStorage.setItem("canvaEnregistre", false);
                            document.getElementById("reservation").textContent= " ";
                            window.location.reload();// force rafraichissement navigateur pour nouvelle reservation
            
        };
    },
    
    intervalRecurrent: function() {
        this.currentTimer = setInterval(this.decompterSeconde, 1000);
    },
    
    clearTimer: function() {
        clearInterval(this.currentTimer);
    },
    
    
};





