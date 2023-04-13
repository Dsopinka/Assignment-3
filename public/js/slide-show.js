"use strict";

const $ = (selector) => document.querySelector(selector);
//defines variables and gets values from ID's from html
let imageCounter = 0;
let imageCache = [];
let slideshowInterval;

const caption = $("#caption");
const mainImage = $("#main_image");
const prevButton = $("#prev");
const nextButton = $("#next");
//sets time inveral on how long it takes to swap images
const startSlideshow = () => {
    slideshowInterval = setInterval(swapImage, 4000);
}

const stopSlideshow = () => {
    clearInterval(slideshowInterval);
}
//this swaps the images and counts for each image to know when to reset
const swapImage = () => {
    imageCounter = (imageCounter +1) % imageCache.length;

    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;

    caption.textContent = imageCache[imageCounter].alt;
}

const showImage = (index) => {
    if (index < 0 || index >= imageCache.length) {
        return;
    }

    imageCounter = index;
    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;
    caption.textContent = imageCache[imageCounter].alt;
}
//adds a event listener for click on the previous button to change to the previous image
prevButton.addEventListener("click", () => {
    stopSlideshow();
    imageCounter = (imageCounter - 1 + imageCache.length) % imageCache.length;
    showImage(imageCounter);
});
//adds an event listener to change to the next image
nextButton.addEventListener("click", () => {
    stopSlideshow();
    imageCounter = (imageCounter + 1) % imageCache.length;
    showImage(imageCounter);
});
//loads DOM
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#image_list a");
    let image;

    for (let link of links) {
        image = new Image();
        image.src = link.href;
        image.alt = link.title;
        imageCache.push(image);
    }

    startSlideshow();
});
