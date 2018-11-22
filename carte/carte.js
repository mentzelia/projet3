var map;

// Initialise et ajoute la carte
function initMap() {
  // Localisation
  var nantes = {lat: 47.2172500, lng: -1.5533600};
  // Carte centrée
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: nantes});
        
}

//Adresse JC Decaux pour récupérer la liste des Stations à Nantes
var serveurUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=1232ae5d7f399bf501c14c35dec06d0a8a71b917";

ajaxGet(serveurUrl, function (reponse) {
    
    // Récupère les données JSON ajaxGet et transforme le JSON en JS
     var listeStation = JSON.parse(reponse);
    genMarker(listeStation);
});

//definition de la fonction qui genere marqueurs sur la map. En parametre on attend une liste d'objets
function genMarker(liste) {
    for (i=0;i<liste.length; i++) {
        var pos = {lat: liste[i].position.lat, lng: liste[i].position.lng};
        
        var marker = new google.maps.Marker({position: pos, map: map});
        marker.addListener('click', function() {
          console.log("Bingo !");
        });
    };
}