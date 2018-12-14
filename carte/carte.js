var map;
var listeStation = [];
var marker;
var statut;
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
        testMarkerSelect = true;
      });
  };
};


//ajout des infos au texte d origine
function affichageInfoStation(listeX){
  document.getElementById("adresse").textContent = "Adresse : " + listeX.address + " - " + listeX.contract_name;
   
  document.getElementById("statut").textContent = "Statut : " + statut;
    
  document.getElementById("veloDispo").textContent = "Nombres de vélos disponibles : " + listeX.available_bikes;
    
  document.getElementById("places").textContent = "Nombres de Place : " + listeX.available_bike_stands;
    
  //statut ouvert ou fermé
  if (listeX.status = "OPEN"){
    statut = "OUVERT";
  } else statut = "FERME";
   
};

//Au clic sur Réserver ouvre fenetre signature + enregistre données Nom/Prénom
document.getElementById("button").addEventListener("click", function (e) {
    var prenom = document.getElementById("prenom");
    var nom = document.getElementById("nom");
    var adresse = document.getElementById("adresse");
    
    e.preventDefault(); //empêche le navigateur de rafraichir
    
    if (testMarkerSelect = false) {
        console.log("Erreur. Veuillez sélectionner une station.");
    } else {
        if (nom.value.length !==0) {
            if (prenom.value.length !==0) {
                localStorage.setItem("prenom", prenom.value);//à verifier?
                localStorage.setItem("nom", nom.value);//à verifier?
                e.preventDefault(); //empêche le navigateur de rafraichir
                document.getElementById("signatureDiv").style.display = "flex";   
            };
        };
    };
});

