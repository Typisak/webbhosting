// Javascript för kontaktsida

// Hämtar alla divvar innehållande frågor
var questionDividers = document.querySelectorAll(".questionDivider");

// Tillägger händelselyssnare som kopplar till funktionen "expandQuestion" till varje div
questionDividers.forEach(element => {
    element.addEventListener("click", expandQuestion);
});

// Använder classList för att tilldela klasser som visar och animerar frågeinnehållet
function expandQuestion(){
    this.parentElement.querySelector("p").classList.toggle("height");   // p-taggen får en höjd
    this.classList.toggle("questionExpand");    // Ändrar rutans utseende samt vänder den interaktiva pilen
}