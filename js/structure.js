const navButton = document.querySelector('.nav-button');
const navLinks = document.querySelector('.nav-bar');

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('nav-bar-hidden');
});