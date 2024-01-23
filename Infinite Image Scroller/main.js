const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 0;

let photosArray = [];
// API url
const count = 3;
const apiKey = 'eAs09JVgMPAkFe8Zx7KJAAe-SEAcSIy_MF-eGkPhIjM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are laoded
function imageLoader() {
    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    //run fn for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // setAttributes(item, {
        //     href: photo.links.html,
        //     target: '_blank',
        // })

        //creating img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // setAttributes(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description
        // });
        //eventlistener,element is finished loading
        img.addEventListener('load', imageLoader);
        //put <img> into <a>,then into img container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}



// get images

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //error catch
        console.error('Error fetching photos:', error);
    }
}

//scrolling near bottom of the page,call more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// onload
getPhotos();