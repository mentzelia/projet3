/* cod javascript slider */

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var ensbleSlides = document.getElementsByClassName("elements_slide_slider1");
    if (n > ensbleSlides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = ensbleSlides.length} ;
    for (i = 0; i < ensbleSlides.length; i++) {
        ensbleSlides[i].style.display = "none"; 
    }
    ensbleSlides[slideIndex-1].style.display = "block"; 
}