const navButton = document.querySelector('.nav-button');
const navLinks = document.querySelector('.nav-bar');

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('nav-bar-hidden');
});

let rusText = document.querySelectorAll('.rus');
let engText = document.querySelectorAll('.eng');
const toggleLang = document.querySelector('.language-button');


if (toggleLang.value == "Rus") {
    for (let index = 0; index < rusText.length; index++) {
        rusText[index].classList.toggle('hidden-lang');        
    }
}
if (toggleLang.value == "Eng") {
    for (let index = 0; index < rusText.length; index++) {
        engText[index].classList.toggle('hidden-lang');        
    }
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
    }
    else {
        toggleLang.value = "Eng";
    }
});