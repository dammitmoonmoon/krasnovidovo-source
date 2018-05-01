const navButton = document.querySelector('.nav-button');
const navLinks = document.querySelector('.nav-bar');

navButton.addEventListener('click', () => {
    if (navLinks.classList.contains('nav-bar-hidden')) {
        navLinks.classList.remove('nav-bar-hidden');
        setTimeout(function () {
            navLinks.classList.remove('nav-bar-invis');
            navLinks.classList.add('nav-bar-vis');
        }, 200);
    }
    else {
        navLinks.classList.remove('nav-bar-vis');
        navLinks.classList.add('nav-bar-invis');
        setTimeout(function () {
            navLinks.classList.add('nav-bar-hidden');
        }, 300);
    }
});
