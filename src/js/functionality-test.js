//Don't show FA icons unless the font is loaded
document.fonts.ready.then(function () {
    const fas = Array.from(document.querySelectorAll('.footer__fa'));
    fas.forEach((item) => {
        item.classList.remove('footer__fa--hidden');
    });
  });

//Show Hamburger Button (in mobile) if JS is available
const navHamburger = document.querySelector('.nav__hamburger');
const navBar = document.querySelector('.nav__bar');
navHamburger.classList.remove('nav__hamburger--hidden');
navBar.classList.remove('nav__bar--visible');

//Hide extra links if JS is available (and display them in different style on click )
const extraLinks = Array.from(document.querySelectorAll('.bar__extra__set'));
extraLinks.forEach((item) => {
    item.classList.add('bar__extra__set--hidden');
    item.classList.add('bar__extra__set--beautify');
});

const mainLinks = Array.from(document.querySelectorAll('.nav__bar__main'));
mainLinks.forEach((item) => {
    item.classList.add('nav__bar__main--beautify');
});

//Toggle navbar on click (hamburger)
navHamburger.addEventListener('click', () => {
    toggleClass(navBar, 'nav__bar--visible');
});

navHamburger.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        toggleClass(navBar, 'nav__bar--visible');
    }
});

const navBarMainLinks = Array.from(document.querySelectorAll('.nav__bar__main'));
navBarMainLinks.forEach((link) => {
    link.addEventListener('click', () => {
        link.children[0].classList.toggle('bar__extra__set--hidden');
        hideItemsOnClickElsewhere(link); 
    })
});

navBarMainLinks.forEach((link) => {
    link.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            link.children[0].classList.toggle('bar__extra__set--hidden');
            hideItemsOnClickElsewhere(link); 
        }
    })
});

function hideItemsOnClickElsewhere(link) {
    document.addEventListener('click', (e) => {
        if (e.target !== link) {
            link.children[0].classList.add('bar__extra__set--hidden');
        }
    });
    document.addEventListener('keyup', (e) => {
        if (event.keyCode === 13) {
            if (e.target !== link) {
                link.children[0].classList.add('bar__extra__set--hidden');
            }
        }
    });
}

const navbar = document.querySelector('.header__nav');
const main = document.querySelector('main');
const sticky = navbar.offsetTop;
window.onscroll = () => {
    activateStickyNav();
};


function activateStickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        main.classList.add("anti-sticky");
    } 
    else {
        navbar.classList.remove("sticky");
        main.classList.remove("anti-sticky");
    }
}

const modal = document.querySelector('.modal');
const modalImg = document.querySelector(".modal__content");
const images = Array.from(document.querySelectorAll('.figure__img'));

images.forEach((image) => {
  image.addEventListener('click', () => {
    let source = image.src.replace(/.jpg/, '-1000.jpg');;
    modal.style.display = "block";
    modalImg.src = source;
  });
});

const span = document.getElementsByClassName("modal__close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}

//======================== Common functions ========================//

function toggleClass(target, className) {
    if (NodeList.prototype.isPrototypeOf(target)) {
        for (let i = 0; i < target.length; i++) {
            target[i].classList.toggle(className);      
        }
    }
    else target.classList.toggle(className);
}

