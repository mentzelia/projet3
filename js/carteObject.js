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
            this.marker = new google.maps.Marker({position: this.pos, map: this.map, station: this.listeStation[i]});
            this.getStationInfo(this.marker, this.texteErreur);
        };

    },

    //d'apres exemple sur google - au click sur le marqueur, ca affiche les infos
    getStationInfo: function (markerX, texteErreur) {
        markerX.addListener('click', function() {
            this.affichageInfoStation(markerX.station);
            this.texteErreur.textContent = "   ";
            this.testMarkerSelect = true;
        }.bind(this));
    },

    affichageInfoStation: function(station) {
        this.nomStationAPI = station.name.split("-");
        this.detailNomStation.textContent = this.nomStationAPI[1];
        this.adresse.textContent = "Adresse : " + station.address + " - " + station.contract_name;
        //statut vélo dispo
        if (station.available_bikes > 0 ){
            this.disponibilite = "OK";
        } else this.disponibilite = "NOK";
        this.veloDispo.textContent = "Nombres de vélos disponibles : " + station.available_bikes;
        this.places.textContent = "Nombres de Place : " + station.available_bike_stands;
        //statut ouvert ou fermé
        if (station.status === "OPEN"){
            this.statut = "OUVERT";
        } else this.statut = "FERME";
        this.statutId.textContent = "Statut : " + this.statut;
        return this.statut;
    },

};