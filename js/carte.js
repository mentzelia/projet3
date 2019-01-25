var Carte = {
    init: function(serveurUrl, coordonneesGPS, mapId, texteErreurId, detailNomStation, adresse, veloDispo, places, statutId) {
        this.map = null;
        this.mapId = document.getElementById(mapId);
        this.listeStation = [];
        this.statut = null;
        this.disponibilite = null;
        this.nomStationAPI = null;
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
        
        //1.récupère liste stations en tableau de données (idem tableau dans postman) -  2.on initie la map car ajaxGet est asynchrone
        ajaxGet(serveurUrl, function(reponseX){
            this.listeStation = JSON.parse(reponseX); // transforme JSON en JS
            this.initMap(this.coordonneesGPS, this.mapId, this.texteErreur);
        }.bind(this));
    },
    
    //Initialisation + ajout carte
    initMap: function(coordonneesGPS, mapId, texteErreur){
        // Carte centrée avec zoom adapté
        this.map = new google.maps.Map(mapId, {zoom: 15, center: this.coordonneesGPS});//création d'une nouvelle carte google - code google map API

        //boucle qui génère les markers d'après la liste de stations récupérées au ajaxGet - code de google
        for (i=0;i<this.listeStation.length; i++) {
             this.pos = {lat: this.listeStation[i].position.lat, lng: this.listeStation[i].position.lng};
             this.marker = new google.maps.Marker({position: this.pos, map: this.map, station: this.listeStation[i]});
             this.getStationInfo(this.marker, this.texteErreur);
       };

    
    },
    
    //d'apres exemple sur google - au click sur le marqueur, ça affiche les infos
        getStationInfo: function (markerX, texteErreur) {
            markerX.addListener('click', function() {
                this.affichageInfoStation(markerX.station);// paramètre est l'info station recup à la generation du marker 
                this.texteErreur.textContent = "   ";
              }.bind(this));
      },
    
    affichageInfoStation: function(station) {
            this.nomStationAPI = station.name.split("-"); //coupe en plusieurs parties, donne un tableau
            this.detailNomStation.textContent = this.nomStationAPI[1];

            this.adresse.textContent = "Adresse : " + station.address + " - " + station.contract_name;//rem: ici station est le paramètre propre à la fonction donc on ne met pas this.station!! 

            //statut vélo dispo utilisé dans objet réservation
            if (station.available_bikes > 0 ){
                this.disponibilite = "OK";
            } else {
                this.disponibilite = "NOK";
            };

            this.veloDispo.textContent = "Nombres de vélos disponibles : " + station.available_bikes;

            this.places.textContent = "Nombres de Place : " + station.available_bike_stands;

            //statut ouvert ou fermé utilisé dans objet réservation
            if (station.status === "OPEN"){
                this.statut = "OUVERT";
            } else {
                this.statut = "FERME";
            };

            this.statutId.textContent = "Statut : " + this.statut;
            return this.statut;
    },

  
};



