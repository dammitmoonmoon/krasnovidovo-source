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

//======================== Carousel ========================//
window.onload = function() {
  if (document.querySelector('.slideshow')) {
      let images = Array.from(document.querySelectorAll('.slideshow__image'));
      let dots = Array.from(document.querySelectorAll('.slideshow__dot'));
      let currentIndex = 0;
      images[currentIndex].style.opacity = 1;
      dots[currentIndex].classList.add('slideshow__dot--active');

      function autoScroll() {
          if (currentIndex == (images.length - 1)) {
              newIndex = 0;
          }
          let newIndex = currentIndex + 1;        
          let timer = setInterval(() => {
              currentIndex = showSlide(newIndex, currentIndex);
              newIndex = currentIndex + 1;
              if (currentIndex == (images.length - 1)) {
                  newIndex = 0;
              }
          }, 5000);
          return timer;
      }

      let timer = autoScroll();

      for (let i = 0; i < dots.length; i++) {
          dots[i].addEventListener('click', () => {
              clearTimeout(timer);
              currentIndex = showSlide(i, currentIndex);
              timer = autoScroll();
          });
      }

      let left = document.querySelector('.slideshow__arrow--left');
      left.addEventListener('click', () => {
          clearTimeout(timer);
          let newIndex = currentIndex - 1;
          if (currentIndex == 0) {
              newIndex = images.length - 1;
          }
          currentIndex = showSlide(newIndex, currentIndex);
          timer = autoScroll();
      })

      let right = document.querySelector('.slideshow__arrow--right');
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
}

function showSlide(newIndex, oldIndex) {
  let images = Array.from(document.querySelectorAll('.slideshow__image'));
  let dots = Array.from(document.querySelectorAll('.slideshow__dot'));
  images[newIndex].style.opacity = 1;
  images[oldIndex].style.opacity = 0;
  dots[oldIndex].classList.remove('slideshow__dot--active');
  dots[newIndex].classList.add('slideshow__dot--active');
  return newIndex;
}

//Graph test
window.onload = function() {
  if (document.getElementById('myDiv') && data_input) {
      
  }
}

function loadJSON (url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true); //true - async
  xhr.send();
  xhr.onload = () => {
      if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          //get part of the object (by year)
          let thisYearData = {};
          let thisYear = data_input[0];
          for (let key in data) {
              if (key.startsWith(thisYear)) {
                  thisYearData[key] = data[key];
              }
          };
          //get x-y for WDIR
          let trace = {
              x: [],
              y: [],
              type: 'scatter'
          };
          let index = 0;
          for (let key in thisYearData) {
              trace.x.push(index++);
              trace.y.push(thisYearData[key][data_input[1]]); 
          }
          let plot = [trace];
          var layout = {
              title: `${data_input[1]} vs days, ${data_input[0]}`,
              xaxis: {
                title: `days (${data_input[0]})` 
              },
              yaxis: {
                title: data_input[1]
              }
            };
          Plotly.newPlot('plot', plot, layout);
      }
      else {
          console.log("Error:", xhr.status, xhr.response);
      }
  }
  xhr.onerror = () => console.log("An error occurred during the transaction:", xhr.readyState);
}

function getOneYearData() {

}

//======================== Datasets ========================//
function showDetails(event) {
  let parent = event.target.parentElement.parentElement;
  let hidden = parent.querySelector('.dataset__description');
  toggleClass(hidden, 'dataset--hide');
}

function showPlot(event) {
  let parent = event.target.parentElement.parentElement;
  let hidden = parent.querySelector('.dataset__plot');
  toggleClass(hidden, 'dataset--hide');
}

let data_input = [];

function getValues(js, firstYear, lastYear) {
  let data = [];
  let year = document.getElementById('data_year').value;
  let errorField = document.getElementById('error');
  if (!validateYear(year, firstYear, lastYear)) {
      errorField.innerHTML = `Введите год в диапазоне от ${firstYear} до ${lastYear}!`;
      return;
  }
  errorField.innerHTML = "";
  let select = document.getElementById('data_parameters');
  let parameter = select.options[select.selectedIndex].value;
  data.push(year);
  data.push(parameter);
  data_input = data;
  loadJSON(js);
}


function validateYear(year, firstYear, lastYear) {
  year = +year;
  if (isNaN(year) || year < firstYear || year > lastYear)
      return false;
  return true;
}
