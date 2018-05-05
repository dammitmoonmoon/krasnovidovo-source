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