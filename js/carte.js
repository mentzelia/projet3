var map;
var listeStation = [];
var marker;
var statut = null;
var disponibilite;
var testMarkerSelect = false;

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

//Champs préremplis à l'ouverture du navigateur si a déjà été rempli une fois
document.getElementById("prenom").value = localStorage.getItem("prenom");
document.getElementById("nom").value = localStorage.getItem("nom");

//ajout des infos au texte d origine
function affichageInfoStation(listeX){
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


    






   

