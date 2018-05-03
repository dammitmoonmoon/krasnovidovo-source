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

//Download larger images on hover
let images = document.querySelectorAll('figure > img');
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('mouseover', (event) => {
        if (window.innerWidth > 1000 && ! (/(1000px)/).test(event.target.src)) {
            let smallerImg = event.target;
            let container = smallerImg.parentNode;
            let largerImg = document.createElement('img');
            largerImg.src = event.target.src.replace(/(..0px)/, '1000px');;
            console.log(smallerImg.src);
            container.replaceChild(largerImg, smallerImg);
        }
    });    
}