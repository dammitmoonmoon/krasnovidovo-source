//Navigation bar
const navButton = document.querySelector('.nav-button');
const navLinks = document.querySelector('.nav-bar');

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('nav-bar-hidden');
});

//Language manipulation
let rusText = document.querySelectorAll('.rus');
let engText = document.querySelectorAll('.eng');
const toggleLang = document.querySelector('.language-button');

toggleLang.addEventListener('click', () => {
    for (let index = 0; index < rusText.length; index++) {
        rusText[index].classList.toggle('hidden-lang');        
    }
    for (let index = 0; index < engText.length; index++) {
        engText[index].classList.toggle('hidden-lang');        
    }
    if (toggleLang.value == "Eng") {
        toggleLang.value = "Rus";
    }
    else {
        toggleLang.value = "Eng";
    }
});

window.onscroll = function() {activateStickyNav()};

// Get the navbar
var navbar = document.querySelector('.grid-nav');
var main = document.querySelector('main');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function activateStickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    main.classList.add("anti-sticky");
  } else {
    navbar.classList.remove("sticky");
    main.classList.remove("anti-sticky");
  }
}