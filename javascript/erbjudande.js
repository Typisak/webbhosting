// JavaScript för Erbjudandesidans dropdown-menyer

// Article bildspel

// Hämtar och lagrar element som innehåller bildspelet
var imgDiv = document.querySelectorAll(".imageDivider");

// Loopar igenom vartenda element som lagrats i 'imgDiv'
imgDiv.forEach(div => {
	/* Loopar genom varenda barn i 'imageDivider's för att tilldela en 
	händelselyssnare till barnen med nodnamnet 'IMG'*/
	Array.from(div.children).forEach(child => {
		Array.from(child.children).forEach(grandchild => {
			grandchild.addEventListener("click", imageSelection);
		});
	});
});

var imageIndex = 0;	// Position i bildspelet

// Funktionen "imageSelection" används för att hantera bildvisningen och förändringen av bilder
function imageSelection(){

    // Hämtar det stora bild-elementet (var källa ska ändras)
	var largeImg = this.parentElement.parentElement.firstElementChild;

    // En array av alla bildvalsalternativ på sidan (picture-taggar)
    var slideshow = Array.from(this.parentElement.parentElement.querySelectorAll(".selection"));

    // Om högerpilen klickas, öka bildindex med 1
    if(this.classList.contains("right")){
        imageIndex += 1;
    }

    // Om vänsterpilen klickas, minska bildindex med 1
    else if(this.classList.contains("left")){
        imageIndex -= 1;
    }

    // Om ett bildvalsalternativ klickas, hämta dess index
    else if(this.nodeName === "IMG"){
        // Söker igenom alla bildvalsalternativ för att hitta det klickade elementet och hämta dess index
        if(this != largeImg.lastElementChild){
            slideshow.forEach((picture, index) => {
                Array.from(picture.children).forEach(child => {
                    if(this == child){
                        imageIndex = index;
                    }
                });
            });
        }           
    }

    // Om bildindexet överstiger antalet bildvalsalternativ, återgå till den första bilden
    if(imageIndex > slideshow.length-1){
        imageIndex = 0;
    }

    // Om bildindexet är mindre än 0, gå till den sista bilden
    else if(imageIndex < 0){
        imageIndex = slideshow.length-1;
    }

    // Tar bort "selected"-klassen från alla bildvalsalternativ
    slideshow.forEach(picture => {
        picture.classList.remove("selected");
    });

    // Lägg till "selected"-klassen på det aktuella bildvalsalternativet
    slideshow[imageIndex].classList.add("selected"); 

    // Skiftar källorna i source-taggarna samt img-taggen i den stora bildens picture-tagg till den valda bildens källor
    Array.from(largeImg.children).forEach((child, index) => {
        if(child.nodeName === "IMG"){
            child.setAttribute("src", slideshow[imageIndex].children[index].getAttribute("src"));   
        }
        else{
            child.setAttribute("srcset", slideshow[imageIndex].children[index].getAttribute("srcset"));
        }
    });
}

// Booking dropdown

// Hämtar och lagrar alla element med data-attributet 'alternative'
var alternative = Array.from(document.querySelectorAll("[data-alternative]"));

// Loopar igenom och tilldelar händelselyssnare till alla lagrade element
alternative.forEach(element => {
	element.addEventListener("click", bookingExpandToggle);	// Lyssnar efter 'click'-händelse och kallar på funktionen 'bookingExpandToggle'
});

function bookingExpandToggle(){
	
	// Hämtar och lagrar det första p-element inom det klickade elementet
	var text = this.querySelector("p");

	/* Om p-elementet innehåller 'Se fler' ändras texten till 
	'Se färre' med en uppåtriktat pil. Om texten istället är 
	'Se färre' eller någonting annat sker motsatsen */
	if (text.innerHTML.includes("Se fler")) {
		text.innerHTML = "Se färre &#9206;";
	} 
	else{
		text.innerHTML = "Se fler &#9207;";
	}
	
	// Hämtar och lagrar elementet som innehåller alla alternativ
	var alternativeContainer = this.parentElement.getElementsByTagName("div")[0];
	
	// Lagrar 'alternativeContainer's barn (alternativen i HTML)
	var siblings = Array.from(alternativeContainer.children);
	
	// Loopar och växlar klasslistan på alternativen för att visas eller inte visas
	siblings.forEach(element => {
		if(element.classList.contains("alternative")){
			element.classList.toggle("alternativeShow");
		}
	});
}
