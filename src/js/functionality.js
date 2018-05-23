document.addEventListener('DOMContentLoaded', () => {
    activateNavButton();
    activateNavBar();
}, false);



window.onscroll = () => {
    activateStickyNav();
};

//======================== Main functions ========================//

function activateNavButton() {
    const navButton = document.querySelector('.nav-button');
    const navLinks = document.querySelector('.nav-bar');
    navButton.addEventListener('click', () => {
        toggleClass(navLinks, 'hide-nav-bar');
    });
    
    navButton.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            toggleClass(navLinks, 'hide-nav-bar');
        }
    });
}

function activateStickyNav() {
    const navbar = document.querySelector('.grid-nav');
    const main = document.querySelector('main');
    const sticky = navbar.offsetTop;
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        main.classList.add("anti-sticky");
    } 
    else {
        navbar.classList.remove("sticky");
        main.classList.remove("anti-sticky");
    }
}

function activateNavBar() {
    const navBarButtons = document.querySelectorAll('.nav-item-main');
    for (let i = 0; i < navBarButtons.length; i++) {
        let navBarButton = navBarButtons[i];
        let navBarItem = navBarButton.parentNode;
        navBarButton.addEventListener('click', (ev) => {
            navBarItem.children[1].classList.toggle('nav-hidden-links');
            hideItemsOnClickElsewhere(navBarItem); 
        });
    }
}


function hideItemsOnClickElsewhere(navBarItem) {
    document.addEventListener("click", (e) => {
        let button = navBarItem.children[0];
        let extraItems = navBarItem.children[1];
        if (e.target !== button) {
            extraItems.classList.add('nav-hidden-links');
        }
    });
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

