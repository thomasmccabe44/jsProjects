//Unsplash API
import { unsplashApi } from require("./api.js");

const count = 10;
const unsplashKey = { unsplashApi };
const apiUrl =
	"https://api.unsplash.com/photos/random/?client_id=${unsplashAPI}&count=${count}";

// Get photos from Unsplash API

async function getUnsplashPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		// Catch Error Here
	}
}

// On Load
getUnsplashPhotos();
