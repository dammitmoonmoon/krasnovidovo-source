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

const details = Array.from(document.querySelectorAll('.dataset__details'));
details.forEach((item) => {
    item.classList.add('dataset__details--hide');
})

//======================== Toggle navbar on click (hamburger) ========================//
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

//======================== Display Images As SlideShow ========================//
if (document.querySelector('.modal')) {
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector(".modal__content");
    const images = Array.from(document.querySelectorAll('.figure__img'));
    const close = document.getElementsByClassName("modal__controller__close")[0];
    const leftArrow = document.getElementsByClassName("modal__controller__arrow--left")[0];
    const rightArrow = document.getElementsByClassName("modal__controller__arrow--right")[0];

    images.forEach((image) => {
        image.addEventListener('click', (event) => {
          let source = image.src.replace(/.jpg/, '-1000.jpg');
          modal.style.display = "block";
          modalImg.src = source;
        });
    });
    
    close.addEventListener('click', () => { 
        modal.style.display = "none";
    })
    
    
    leftArrow.addEventListener('click', () => { 
        const images = Array.from(document.querySelectorAll('.figure__img'));
        let imagesHR = collectHighResolutionImages(images);
        let newSource = imagesHR[findLeft(modalImg)];
        modalImg.src = newSource;
    })
    
    
    rightArrow.addEventListener('click', () => { 
        const images = Array.from(document.querySelectorAll('.figure__img'));
        let imagesHR = collectHighResolutionImages(images);
        let newSource = imagesHR[findRight(modalImg)];
        modalImg.src = newSource;
    })
}

function collectHighResolutionImages(images) {
    let imagesHR = [];
    images.forEach((image) => {
        imagesHR.push(image.src.replace(/.jpg/, '-1000.jpg'));
    });
    return imagesHR;
}

function findLeft(modalImg) {
    let src = modalImg.src;
    const images = Array.from(document.querySelectorAll('.figure__img'));
    let imagesHR = collectHighResolutionImages(images);
    let position = imagesHR.indexOf(src);
    let left = 0;
    if (position == 0) {
        left = imagesHR.length - 1;
    }
    else {
        left = position - 1;
    }
    return left;
}

function findRight(modalImg) {
    let src = modalImg.src;
    const images = Array.from(document.querySelectorAll('.figure__img'));
    let imagesHR = collectHighResolutionImages(images);
    let position = imagesHR.indexOf(src);
    let right = 0;
    if (position == (imagesHR.length - 1) ) {
        right = 0;
    }
    else {
        right = position + 1;
    }
    return right;
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

//======================== Datasets ========================//
function showDetails(event) {
    let parent = event.target.parentElement;
    let hidden = parent.children[(parent.children.length)-1];
    toggleClass(hidden, 'dataset__details--hide');
}