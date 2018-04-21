const navButton = document.getElementById('nav-button');
const navLinks = document.getElementById('nav-links');
const navToggleLinks = document.querySelectorAll('nav-toggling-link');
const hiddenLinks = document.querySelectorAll('.nav-hidden-links');

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('hide-me');
});

//To think and to test later: ho do i simulate the hover effect on mobile? 
// for (let i = 0; i < navToggleLinks.length; i++) {
//     navToggleLinks[i].addEventListener('touchstart', () => {
//         let hiddenChildren = navToggleLinks[i].childNodes;
//         for (let j = 0; j < hiddenChildren.length; j++) {
//             hiddenChildren[j].classList.remove('hide-me');
//         }
//     });
// };

//Slider - fade-out effect (but why do the pictures shake?)
if (window.location.pathname == '/' || window.location.pathname == '/krasnovidovo-2018/') {
    const holder = document.querySelector('.index-slideshow');
    const img = document.querySelector('.index-slideshow >img');
    const srcs = ['img/lake-kajak-kayak.jpg', 'img/pexels-photo-154246.jpeg', 'img/pexels-photo-417191.jpeg'];
    img.src = srcs[0];
    let i = 0;
    function fade() {
        img.style.opacity = 1;
        if (i == srcs.length) {
            i = 0;
        }
        img.src = srcs[i];
        setTimeout(() => { img.style.opacity = 0; }, 7000);
        i++;
    }
    function auto() {
        setInterval(fade, 8000);
    }
    window.onload = auto;
}

