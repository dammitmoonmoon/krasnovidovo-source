//Navigation bar
const navButton = document.querySelector('.nav-button');
const navLinks = document.querySelector('.nav-bar');

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('hide-nav-bar');
});

navButton.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        navLinks.classList.toggle('hide-nav-bar');
    }
});

//Sticky nav bar
window.onscroll = function() {activateStickyNav()};
var navbar = document.querySelector('.grid-nav');
var main = document.querySelector('main');
var sticky = navbar.offsetTop;

function activateStickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    main.classList.add("anti-sticky");
  } else {
    navbar.classList.remove("sticky");
    main.classList.remove("anti-sticky");
  }
}

//Language manipulation

let rusText = document.querySelectorAll('.rus');
let engText = document.querySelectorAll('.eng');
const toggleLang = document.querySelector('.language-button');

if (localStorage.getItem('language') == 'rus') {
    for (let index = 0; index < rusText.length; index++) {
        rusText[index].classList.toggle('hidden-lang');        
    }
    for (let index = 0; index < engText.length; index++) {
        engText[index].classList.toggle('hidden-lang');        
    }
    toggleLang.value = "Eng";
} 

toggleLang.addEventListener('click', () => {
    for (let index = 0; index < rusText.length; index++) {
        rusText[index].classList.toggle('hidden-lang');        
    }
    for (let index = 0; index < engText.length; index++) {
        engText[index].classList.toggle('hidden-lang');        
    }
    if (toggleLang.value == "Eng") {
        toggleLang.value = "Rus";
        localStorage.removeItem('language');
    }
    else {
        toggleLang.value = "Eng";
        localStorage.setItem('language', 'rus');
    }
});

// Navigation menu: show/hide extra links on click
const navTogglers = document.querySelectorAll('.nav-item-main');
for (let i = 0; i < navTogglers.length; i++) {
    let navToggler = navTogglers[i];
    navToggler.addEventListener('click', (ev) => {
        navToggler.parentNode.children[2].classList.toggle('nav-hidden-links');
        document.addEventListener("click", function(evt) {
            let targetElement = evt.target;
            if (targetElement !== navToggler.parentNode.children[0] && targetElement !== navToggler.parentNode.children[1]) {
                navToggler.parentNode.children[2].classList.add('nav-hidden-links');
            }
        });
    });
}
