const navigationController = (function() {
    const navHamburger = document.querySelector('.nav__hamburger');
    const navBar = document.querySelector('.nav__bar');
    const mainLinks = Array.from(document.querySelectorAll('.nav__bar__main'));
    const extraLinks = Array.from(document.querySelectorAll('.bar__extra__set'));
    const main = document.querySelector('main');
    const sticky = navBar.offsetTop;

/* Remove no-JS fallbacks: 
hide extra links, change menu styles, switch to hamburger button on mobile */

    const switchToHamburgerButton = () => {
        navHamburger.classList.remove('nav__hamburger--hidden');
        navBar.classList.remove('nav__bar--visible')
    }

    const beautifyMainLinks = () => {
        mainLinks.forEach((item) => {
            item.classList.add('nav__bar__main--beautify');
        });
    }

    const hideExtraLinks = () => {
        extraLinks.forEach((item) => {
            item.classList.add('bar__extra__set--hidden');
            item.classList.add('bar__extra__set--beautify');
        });
    }

/* Toggle extra links on click */

    const toggleNavBar = () => {
        navHamburger.addEventListener('click', () => {
            helper.toggleClass(navBar, 'nav__bar--visible');
        });
        navHamburger.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                helper.toggleClass(navBar, 'nav__bar--visible');
            }
        });
    }

    const hideItemsOnClickElsewhere = (link) => {
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

    const toggleExtraLinks = () => {
        mainLinks.forEach((link) => {
            link.addEventListener('click', () => {
                link.children[0].classList.toggle('bar__extra__set--hidden');
                hideItemsOnClickElsewhere(link); 
            })
        });
    }

/* Activate sticky nav */
    const activateStickyNav = () => {
        if (window.pageYOffset >= sticky) {
            navBar.classList.add("sticky");
            main.classList.add("anti-sticky");
        } 
        else {
            navBar.classList.remove("sticky");
            main.classList.remove("anti-sticky");
        }
    }

/* "Interface" */
    return {
        removeFallbacks: () => {
            hideExtraLinks();
            beautifyMainLinks();
            switchToHamburgerButton();
        },

        activateNavBar: () => {
            toggleNavBar();
            toggleExtraLinks();
        },

        activateStickyNav: activateStickyNav,
    };

})();

const helper = {
    toggleClass: (target, className) => {
        if (NodeList.prototype.isPrototypeOf(target)) {
            for (let i = 0; i < target.length; i++) {
                target[i].classList.toggle(className);      
            }
        }
        else target.classList.toggle(className);
    }
}

const imageController = (function(){
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector(".modal__content");
    const images = Array.from(document.querySelectorAll('.figure__img'));
    const close = document.getElementsByClassName("modal__controller__close")[0];
    const leftArrow = document.getElementsByClassName("modal__controller__arrow--left")[0];
    const rightArrow = document.getElementsByClassName("modal__controller__arrow--right")[0];
    const imagesHR = collectHighResolutionImages(images);

    const setModalImageEvent = () => {
        images.forEach((image) => {
            image.addEventListener('click', (event) => {
              let source = image.src.replace(/.jpg/, '-1000.jpg');
              modal.style.display = "block";
              modalImg.src = source;
            });
        });
    }

    const setCloseEvent = () => {
        close.addEventListener('click', () => { 
            modal.style.display = "none";
        })
    }

    const setScrollLeftEvent = () => {
        leftArrow.addEventListener('click', () => { 
            let newSource = imagesHR[findLeft(modalImg)];
            modalImg.src = newSource;
        })
    }

    const setScrollRightEvent = () => {
        rightArrow.addEventListener('click', () => { 
            let newSource = imagesHR[findRight(modalImg)];
            modalImg.src = newSource;
        })
    }
//Helper functions
    function collectHighResolutionImages(images) {
        let imagesHR = [];
        images.forEach((image) => {
            imagesHR.push(image.src.replace(/.jpg/, '-1000.jpg'));
        });
        return imagesHR;
    }

    function findLeft(modalImg) {
        let src = modalImg.src;
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

    return {
        activateModalImageControllers: () => {
            if (document.querySelector('.modal')) {
                setModalImageEvent();
                setCloseEvent();
                setScrollLeftEvent();
                setScrollRightEvent();
            }
        }
    }
})();



const carouselControls = (function() {
    const images = Array.from(document.querySelectorAll('.slideshow__image'));
    const dots = Array.from(document.querySelectorAll('.slideshow__dot'));
    const left = document.querySelector('.slideshow__arrow--left');
    const right = document.querySelector('.slideshow__arrow--right');
    let currentIndex = 0;
    let timer = 0;

    const setSlideShow = () => {
        images[currentIndex].style.opacity = 1;
        dots[currentIndex].classList.add('slideshow__dot--active');

        timer = autoScroll();

        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', () => {
                clearTimeout(timer);
                currentIndex = showSlide(i, currentIndex);
                timer = autoScroll();
            });
        }
    }
    
    const setControlLeft = () => {
        left.addEventListener('click', () => {
            clearTimeout(timer);
            let newIndex = currentIndex - 1;
            if (currentIndex == 0) {
                newIndex = images.length - 1;
            }
            currentIndex = showSlide(newIndex, currentIndex);
            timer = autoScroll();
        })
    }

    const setControlRight = () => {
        right.addEventListener('click', () => {
            clearTimeout(timer);
            let newIndex = currentIndex + 1;
            if (currentIndex == (images.length - 1)) {
                newIndex = 0;
            }
            currentIndex = showSlide(newIndex, currentIndex);
            timer = autoScroll();
        })
    }

    function autoScroll() {
        let newIndex = currentIndex + 1;
        if (currentIndex == (images.length - 1)) {
            newIndex = 0;
        }
        let timer = setInterval(() => {
            currentIndex = showSlide(newIndex, currentIndex);
            newIndex = currentIndex + 1;
            if (currentIndex == (images.length - 1)) {
                newIndex = 0;
            }
        }, 5000);
        return timer;
    }

    function showSlide(newIndex, oldIndex) {
        images[newIndex].style.opacity = 1;
        images[oldIndex].style.opacity = 0;
        dots[oldIndex].classList.remove('slideshow__dot--active');
        dots[newIndex].classList.add('slideshow__dot--active');
        return newIndex;
    }

    return {
        setCarousel: () => {
            if (document.querySelector('.slideshow')) {
                setSlideShow();
                setControlLeft();
                setControlRight();
            }
        }
    }
})();


//======================== Gradual Image Loading ========================//
// window.onload = function() {
//     if (document.querySelector('.slideshow__placeholder')) {
//         let placeholder = document.querySelector('.slideshow__placeholder');
//         let small = placeholder.querySelector('.slideshow__image');
//         let img = new Image();
//         img.src = small.src;
//         img.onload = function () {
//             small.classList.add('slideshow__image--loaded');
//             small.classList.add('slideshow__image--small');
//         };
        
//         let imgLarge = new Image();
//         imgLarge.src = placeholder.dataset.large;
//         imgLarge.onload = function () {
//             imgLarge.classList.add('slideshow__image--loaded');
//         };

//         placeholder.appendChild(imgLarge);
//     }
// }


//Plot data

let dataParameters = {};

function setDataDescription() {
    const data = document.getElementById('data_submit');
    dataParameters.folder = data.dataset.folder;
    dataParameters.firstYear = data.dataset.firstyear;
    dataParameters.lastYear = data.dataset.lastyear;
}

function getDataFromUser() {
    let select = document.getElementById('data_parameters');
    dataParameters.parameter = select.options[select.selectedIndex].value;

    let year = document.getElementById('data_year').value;
    let errorField = document.getElementById('error');
    
    if (!validateYear(year, dataParameters.firstYear, dataParameters.lastYear)) {
        errorField.innerHTML = `Введённый год (${year}) вне диапазона ${dataParameters.firstYear}&ensp;${dataParameters.lastYear}!`;
        return;
    }    
    errorField.innerHTML = "";
    dataParameters.fileName = year;
}

function validateYear(year, firstYear, lastYear) {
    year = +year;
    if (isNaN(year) || year < firstYear || year > lastYear)
        return false;
    return true;
  }

function plot() {
    setDataDescription();
    getDataFromUser();
    getDataFromServer()
        .then(plotly);
}

function getDataFromServer() {
    return new Promise((resolve, reject) => {
        let urlRaw = `${dataParameters.folder}/${dataParameters.fileName}.json`;
        let urlAverage = `${dataParameters.folder}/average.json`;
        Promise.all([getJSON(urlRaw), getJSON(urlAverage)])
        .then(results => { 
            dataParameters.dataRaw = results[0];
            dataParameters.dataAverage = results[1];
            console.log(dataParameters);
            resolve();
        })
        .catch(e => {console.log(e.message);});
    });
}


function getJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            try {
                if ((this.status === 200)) {
                    resolve(JSON.parse(this.responseText));
                }
                else {
                    reject(this.status + ' ' + this.statusText); 
                }
            } catch(e) {
                reject(e.message);
            }  
        };

        xhr.onerror = function() {
            reject(this.status + ' ' + this.statusText);
        };
        xhr.send();
    });
}

function plotly() {
    let trace1 = getPlotData(dataParameters.dataRaw, `observed in ${dataParameters.firstYear}`);
    console.log(trace1);
    let trace2 = getPlotData(dataParameters.dataAverage, `average (${dataParameters.firstYear}-${dataParameters.lastYear})`);
    trace2.x = trace1.x;
    console.log(trace2);
    let data = [trace1, trace2];

    let layout = {
        xaxis: {
            type: 'date',
            tickformat: '%b',
            title: 'Date'
        },
        yaxis: {
            title: dataParameters.parameter
        },
      };
      
    Plotly.newPlot('plot', data, layout);
}

function getPlotData(data, title) {
    let traceData = {
        x: [],
        y: [],
        type: 'scatter', 
        name: title
    };

    for (let prop in data) {
        traceData.x.push(prop);
        traceData.y.push(data[prop][dataParameters.parameter]);
    }
    
    return traceData;
}


//======================== Datasets ========================//
function showDetails(event) {
    let parent = event.target.parentElement.parentElement;
    let hidden = parent.querySelector('.dataset__description');
    helper.toggleClass(hidden, 'dataset--hide');
}

function showPlot(event) {
    let parent = event.target.parentElement.parentElement;
    let hidden = parent.querySelector('.dataset__plot');
    helper.toggleClass(hidden, 'dataset--hide');
}




document.addEventListener("DOMContentLoaded", navigationController.removeFallbacks);
document.addEventListener("DOMContentLoaded", navigationController.activateNavBar);
window.addEventListener("scroll", navigationController.activateStickyNav);
document.addEventListener("DOMContentLoaded", imageController.activateModalImageControllers);
document.addEventListener("DOMContentLoaded", carouselControls.setCarousel);