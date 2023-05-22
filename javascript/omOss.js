// JavaScript for Om oss-sida

// Animeringsfunktion för att röra element från vänster
function slideFromLeftAnimation(){
    return[
        {transform: "translateX(-100%)", opacity: 0},
        {transform: "translateX(0)", opacity: 1},
    ];
}

// Animeringsfunktion för att röra element från höger
function slideFromRightAnimation(){
    return[
        {transform: "translateX(100%)", opacity: 0 },
        { transform: "translateX(0)", opacity: 1 },
    ];
}

// Objektet för att definiera animeringens hastighet och iterationer
const timing = {
    duration: 750,  // Animeringens varaktighet på 750 millisekunder
    iterations: 1,  // Antalet gånger animeringen spelas upp vid .animate
};

// Hämtar alla element med 'data-slide'-attributet
var animatedElements = document.querySelectorAll("[data-slide]");

// Funktion för att avgöra om elementet är synligt på skärmen
function elementInView(element, dividend = 1){
    const elementTop = element.getBoundingClientRect().top;
  
    return(
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
}

// Funktion för att avgöra om elementet inte längre är synligt på skärmen
function elementOutofView(element){
    const elementTop = element.getBoundingClientRect().top;
  
    return(
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Funktion för att animera ett element
function displayScrollElement(element){
    if (!element.classList.contains("scrolled")) {
        // Om attributet 'data-slide' är 'left' spelas animation från vänster, annars från höger
        if(element.dataset.slide == "left"){
            element.animate(slideFromLeftAnimation(), timing);
        }
        else{
            element.animate(slideFromRightAnimation(), timing);
        }
        // Lägger till klassen 'scrolled' på elementet för att undvika att animeringen spelas upp igen
        element.classList.add("scrolled");
    }
}

// Funktion för att ta bort synlighet från elementet
function hideScrollElement(element){
    element.classList.remove("scrolled");
}

// Funktion för att hantera animering när användaren scrollar på sidan
function handleScrollAnimation(){
    // Loop går igenom alla element med attributet 'data-slide'
    animatedElements.forEach((element) => {
        if(elementInView(element, 1.15)){ // Om elementet är synligt på skärmen (med en divident på 1.15)
            displayScrollElement(element); // Visa animering på elementet
        } 
        else if(elementOutofView(element)){ // Om elementet inte längre är synligt på skärmen
            hideScrollElement(element); // Ta bort animering från elementet
        }
    });
}

// Lyssnar efter 'scroll'-händelsen och kallar funktionen för att hantera animationer
window.addEventListener("scroll", () => { 
    handleScrollAnimation();
});