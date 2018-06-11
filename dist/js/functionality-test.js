"use strict";document.fonts.ready.then(function(){Array.from(document.querySelectorAll(".footer__fa")).forEach(function(e){e.classList.remove("footer__fa--hidden")})});var navHamburger=document.querySelector(".nav__hamburger"),navBar=document.querySelector(".nav__bar");navHamburger.classList.remove("nav__hamburger--hidden"),navBar.classList.remove("nav__bar--visible");var extraLinks=Array.from(document.querySelectorAll(".bar__extra__set"));extraLinks.forEach(function(e){e.classList.add("bar__extra__set--hidden"),e.classList.add("bar__extra__set--beautify")});var mainLinks=Array.from(document.querySelectorAll(".nav__bar__main"));mainLinks.forEach(function(e){e.classList.add("nav__bar__main--beautify")});var details=Array.from(document.querySelectorAll(".dataset__details"));details.forEach(function(e){e.classList.add("dataset__details--hide")}),navHamburger.addEventListener("click",function(){toggleClass(navBar,"nav__bar--visible")}),navHamburger.addEventListener("keyup",function(e){13===e.keyCode&&toggleClass(navBar,"nav__bar--visible")});var navBarMainLinks=Array.from(document.querySelectorAll(".nav__bar__main"));function hideItemsOnClickElsewhere(t){document.addEventListener("click",function(e){e.target!==t&&t.children[0].classList.add("bar__extra__set--hidden")}),document.addEventListener("keyup",function(e){13===event.keyCode&&e.target!==t&&t.children[0].classList.add("bar__extra__set--hidden")})}navBarMainLinks.forEach(function(e){e.addEventListener("click",function(){e.children[0].classList.toggle("bar__extra__set--hidden"),hideItemsOnClickElsewhere(e)})}),navBarMainLinks.forEach(function(t){t.addEventListener("keyup",function(e){13===e.keyCode&&(t.children[0].classList.toggle("bar__extra__set--hidden"),hideItemsOnClickElsewhere(t))})});var navbar=document.querySelector(".header__nav"),main=document.querySelector("main"),sticky=navbar.offsetTop;function activateStickyNav(){window.pageYOffset>=sticky?(navbar.classList.add("sticky"),main.classList.add("anti-sticky")):(navbar.classList.remove("sticky"),main.classList.remove("anti-sticky"))}if(window.onscroll=function(){activateStickyNav()},document.querySelector(".modal")){var modal=document.querySelector(".modal"),modalImg=document.querySelector(".modal__content"),images=Array.from(document.querySelectorAll(".figure__img")),close=document.getElementsByClassName("modal__controller__close")[0],leftArrow=document.getElementsByClassName("modal__controller__arrow--left")[0],rightArrow=document.getElementsByClassName("modal__controller__arrow--right")[0];images.forEach(function(a){a.addEventListener("click",function(e){var t=a.src.replace(/.jpg/,"-1000.jpg");modal.style.display="block",modalImg.src=t})}),close.addEventListener("click",function(){modal.style.display="none"}),leftArrow.addEventListener("click",function(){var e=collectHighResolutionImages(Array.from(document.querySelectorAll(".figure__img")))[findLeft(modalImg)];modalImg.src=e}),rightArrow.addEventListener("click",function(){var e=collectHighResolutionImages(Array.from(document.querySelectorAll(".figure__img")))[findRight(modalImg)];modalImg.src=e})}function collectHighResolutionImages(e){var t=[];return e.forEach(function(e){t.push(e.src.replace(/.jpg/,"-1000.jpg"))}),t}function findLeft(e){var t=e.src,a=collectHighResolutionImages(Array.from(document.querySelectorAll(".figure__img"))),r=a.indexOf(t);return 0==r?a.length-1:r-1}function findRight(e){var t=e.src,a=collectHighResolutionImages(Array.from(document.querySelectorAll(".figure__img"))),r=a.indexOf(t);return r==a.length-1?0:r+1}function toggleClass(e,t){if(NodeList.prototype.isPrototypeOf(e))for(var a=0;a<e.length;a++)e[a].classList.toggle(t);else e.classList.toggle(t)}function showDetails(e){var t=e.target.parentElement;toggleClass(t.children[t.children.length-1],"dataset__details--hide")}