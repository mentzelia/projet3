var Carte = {
    init: function(serveurUrl, coordonneesGPS, mapId, texteErreurId, detailNomStation, adresse, veloDispo, places, statutId) {
        this.map;
        this.mapId = document.getElementById(mapId);
        this.listeStation = [];
        this.statut = null;
        this.disponibilite;
        this.testMarkerSelect = false;
        this.nomStationAPI;
        this.serveurUrl = serveurUrl;
        this.coordonneesGPS = coordonneesGPS; // Localisation pour le centre de la carte
        this.texteErreur = document.getElementById(texteErreurId);
        this.detailNomStation = document.getElementById(detailNomStation);
        this.adresse = document.getElementById(adresse);
        this.veloDispo = document.getElementById(veloDispo);
        this.places = document.getElementById(places);
        this.statutId = document.getElementById(statutId);
        
        
        this.getAjax(serveurUrl);
        
    },
    
    getAjax: function(serveurUrl) {
        
        //on initie la map apres l appel ajax pour etre sur d avoir récuperé toutes les donnees car ajaxGet est asynchrone
        ajaxGet(serveurUrl, function(reponseX){
            // transforme JSON en JS
            this.listeStation = JSON.parse(reponseX);//mettre bind ou pas? a tester
            this.initMap(this.coordonneesGPS, this.mapId, this.texteErreur);
        }.bind(this));
    },
    
    //Initialisation + ajout carte
    initMap: function(coordonneesGPS, mapId, texteErreur){
        console.log(this);
        // Carte centrée avec zoom adapté
        this.map = new google.maps.Map(mapId, {zoom: 15, center: this.coordonneesGPS});

        //boucle qui genere les markers d apres la liste de stations recuperees au ajaxGet
        for (i=0;i<this.listeStation.length; i++) {
             this.pos = {lat: this.listeStation[i].position.lat, lng: this.listeStation[i].position.lng};
             this.marker = new google.maps.Marker({position: this.pos, map: this.map});
             this.getStationInfo(this.marker, this.listeStation[i], this.texteErreur);
       };

    
    },
    
    //d'apres exemple sur google - au click sur le marqueur, ca affiche les infos
        getStationInfo: function (markerX, listeX, texteErreur) {
            markerX.addListener('click', function() {
                this.affichageInfoStation(listeX);
                this.texteErreur.textContent = "   ";
                this.testMarkerSelect = true;
              }.bind(this));
      },
    
    affichageInfoStation: function(listeX) {
            this.nomStationAPI = listeX.name.split("-");
            this.detailNomStation.textContent = this.nomStationAPI[1];

            this.adresse.textContent = "Adresse : " + listeX.address + " - " + listeX.contract_name;

            //statut vélo dispo
            if (listeX.available_bikes > 0 ){
                this.disponibilite = "OK";
            } else this.disponibilite = "NOK";

            this.veloDispo.textContent = "Nombres de vélos disponibles : " + listeX.available_bikes;

            this.places.textContent = "Nombres de Place : " + listeX.available_bike_stands;

            //statut ouvert ou fermé
            if (listeX.status === "OPEN"){
                this.statut = "OUVERT";
            } else this.statut = "FERME";

            this.statutId.textContent = "Statut : " + this.statut;
            return this.statut;
    },

  
};


//Creation objet carte
 
//Adresse JC Decaux pour récupérer la liste des Stations à Nantes
var serveurJCDecaux = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=1232ae5d7f399bf501c14c35dec06d0a8a71b917";

//Coordonnées GPS ville de Nantes
var nantesGPS = {lat: 47.2172500, lng: -1.5533600};


var carte1 = Object.create(Carte);
carte1.init(serveurJCDecaux, nantesGPS, "map", "texteErreur", "detailNomStation", "adresse", "veloDispo", "places", "statutId");

