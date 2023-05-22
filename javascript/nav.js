// Javascript för Nav-meny

// Hämtar och lagrar hamburgarikonen, navigationsmenyn som expanderas och menyns innehåll
var hamburger = document.querySelector(".hamburger");
var navMenu = document.querySelector(".navMenu");
var listItems = Array.from(navMenu.children);

// Lyssnar efter 'click'-händelsen och kallar på funktionen 'expand'
hamburger.addEventListener("click", expand);

function expand(){
	
	// Om menyn är osynlig 'opacity: 0' tilldelas en synlig opacitet
	if(window.getComputedStyle(navMenu, null).opacity == "0"){
		navMenu.style.visibility = "visible";	// Skifte av synlighet tillåter animation
		navMenu.style.opacity = "1";

		// Loopar igenom menyns innehåll och tilldelar ett synligt display-värde		
		listItems.forEach((element) => {	
			element.style.display = "block";
		});
	}
	
	// Om menyn är synlig 'opacity: 1' (eller någonting annat) tilldelas en osynlig opacitet
	else{
		navMenu.style.visibility = "hidden"; // Tillåter animation
		navMenu.style.opacity = "0";
		
		// Loopar igenom menyns innehåll och tilldelar ett osynligt display-värde
		listItems.forEach((element) => {
			element.style.display = "none";
		});
	}
	
	/* Loopar igenom hamburgarikonens barn (span-element) och tilldelar klassen 
	engaged som triggar css-animation*/
	Array.from(hamburger.children).forEach(span => {
		span.classList.toggle("engaged");
	});
}