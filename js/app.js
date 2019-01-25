//1.Creation de l'objet
var ensbleSlides = $(".elements_slide_slider1");
var buttonLeft = $("#button_left");
var buttonRight = $("#button_right");
var buttonPause = $(".fa-pause");
var buttonPlay = $(".fa-play");

var slider1 = Object.create(Slider);
slider1.init(ensbleSlides, buttonLeft, buttonRight, buttonPause, buttonPlay, 5000);



//2.Creation objet carte
 
//Adresse JC Decaux pour récupérer la liste des Stations à Nantes
var serveurJCDecaux = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=1232ae5d7f399bf501c14c35dec06d0a8a71b917";

//Coordonnées GPS ville de Nantes
var nantesGPS = {lat: 47.2172500, lng: -1.5533600};


var carte1 = Object.create(Carte);
carte1.init(serveurJCDecaux, nantesGPS, "map", "texteErreur", "detailNomStation", "adresse", "veloDispo", "places", "statutId");




//3.Creation objet gestionnaire reservation
var managerReservation = Object.create(ObjetReservation);
managerReservation.init('button', carte1);