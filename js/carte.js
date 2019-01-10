var map;
var listeStation = [];
var marker;
var statut = null;
var disponibilite;
var testMarkerSelect = false;
var nomStationAPI;

//Adresse JC Decaux pour récupérer la liste des Stations à Nantes
var serveurUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=1232ae5d7f399bf501c14c35dec06d0a8a71b917";


//on initie la map apres l appel ajax pour etre sur d avoir récuperé toutes les donnees car ajaxGet est asynchrone
ajaxGet(serveurUrl, function (reponseX) {
    // Récupère les données JSON ajaxGet et transforme le JSON en JS
    listeStation = JSON.parse(reponseX);
    initMap();
});

// Initialise et ajoute la carte
function initMap() {
  // Localisation pour le centre de la carte
  var nantes = {lat: 47.2172500, lng: -1.5533600};
  // Carte centrée avec zoom adapté
  map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: nantes});

    //boucle qui genere les markers d apres la liste de stations recuperees au ajaxGet
    for (i=0;i<listeStation.length; i++) {
         var pos = {lat: listeStation[i].position.lat, lng: listeStation[i].position.lng};
         var marker = new google.maps.Marker({position: pos, map: map});
         getStationInfo(marker, listeStation[i]);
   };
    
    //d'apres exemple sur google - au click sur le marqueur, ca affiche les infos
    function getStationInfo(markerX, listeX) {
    markerX.addListener('click', function() {
        affichageInfoStation(listeX);
        document.getElementById("texteErreur").textContent = "   ";
        testMarkerSelect = true;
      });
  };
};


//ajout des infos au texte d origine
function affichageInfoStation(listeX){
    nomStationAPI = listeX.name.split("-");
    document.getElementById("nomStation").textContent = "Nom: " + nomStationAPI[1];
     
    document.getElementById("adresse").textContent = "Adresse : " + listeX.address + " - " + listeX.contract_name;
    
    //statut vélo dispo
    if (listeX.available_bikes > 0 ){
        disponibilite = "OK";
    } else disponibilite = "NOK";
    
    document.getElementById("veloDispo").textContent = "Nombres de vélos disponibles : " + listeX.available_bikes;
    
    document.getElementById("places").textContent = "Nombres de Place : " + listeX.available_bike_stands;
    
    //statut ouvert ou fermé
    if (listeX.status === "OPEN"){
        statut = "OUVERT";
    } else statut = "FERME";
    
    document.getElementById("statut").textContent = "Statut : " + statut;
   
};

/*
//Objet carte
var Carte = {
    init: function() {
        this.map;
        this.marker;
        this.disponibilite;
        this.listeStation = [];
        this.status = null;
        this.testMarkerSelect = false;
        this.serveurUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=1232ae5d7f399bf501c14c35dec06d0a8a71b917"; //Adresse JC Decaux pour récupérer la liste des Stations à Nantes
        
        this.callAjax();
        this.initMap();
        this.affichageInfoStation();
    
    
},
    
    //on initie la map apres l appel ajax pour etre sur d avoir récuperé toutes les donnees car ajaxGet est asynchrone
    callAjax: function() {
        ajaxGet(this.serveurUrl, function (reponseX) {
            // Récupère les données JSON ajaxGet et transforme le JSON en JS
            this.listeStation = JSON.parse(this.reponseX);
            
            this.initMap();
            
        }.bind(this));
    },
        
        
    // Initialise et ajoute la carte
    initMap: function() {
        // Localisation pour le centre de la carte
        this.nantes = {lat: 47.2172500, lng: -1.5533600};
        // Carte centrée avec zoom adapté
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: this.nantes}).bind(this);

        //boucle qui genere les markers d apres la liste de stations recuperees au ajaxGet
        for (i=0;i<this.listeStation.length; i++) {
            this.pos = {lat: this.listeStation[i].position.lat, lng: this.listeStation[i].position.lng};
            this.marker = new google.maps.Marker({position: this.pos, map: this.map}).bind(this);
            this.getStationInfo(this.marker, this.listeStation[i]).bind(this);
        };
    
        //d'apres exemple sur google - au click sur le marqueur, ca affiche les infos
        getStationInfo: function (markerX, listeX) {
            this.markerX.addListener('click', function() {
                this.affichageInfoStation(listeX);
                document.getElementById("texteErreur").textContent = "   ";
                this.testMarkerSelect = true;
            .bind(this)});
        };
    },
        
    //ajout des infos au texte d origine
    affichageInfoStation: function (listeX) {
        document.getElementById("adresse").textContent = "Adresse : " + this.listeX.address + " - " + this.listeX.contract_name;

        //statut vélo dispo
        if (this.listeX.available_bikes > 0 ){
            this.disponibilite = "OK";
        } else this.disponibilite = "NOK";

        document.getElementById("veloDispo").textContent = "Nombres de vélos disponibles : " + this.listeX.available_bikes;

        document.getElementById("places").textContent = "Nombres de Place : " + this.listeX.available_bike_stands;

        //statut ouvert ou fermé
        if (this.listeX.status === "OPEN"){
            this.statut = "OUVERT";
        } else this.statut = "FERME";

        document.getElementById("statut").textContent = "Statut : " + this.statut;
   
    },
    

    
}
    
    

*/



    






   

