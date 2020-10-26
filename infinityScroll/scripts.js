//Unsplash API

const { default: config } = "./config";
const imageContainer = document.getElementById("imgContainer");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = config;
let apiUrl =
	"https://api.unsplash.com/photos/random/?client_id=EO71ZbpxklAumWwiP_fzPjgCGw555Rq8VMYHaQtp1X0&count=5";

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		apiUrl =
			"https://api.unsplash.com/photos/random/?client_id=EO71ZbpxklAumWwiP_fzPjgCGw555Rq8VMYHaQtp1X0&count=30";
	}
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for Links & Photos, Add to Dom
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;

	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// Create <img> for photo
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event Listener, check when each is finished loading
		img.addEventListener("load", imageLoaded);
		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API

async function getUnsplashPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch Error Here
	}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getUnsplashPhotos();
	}
});

// On Load
getUnsplashPhotos();
