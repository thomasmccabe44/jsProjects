const quoteContainerId = document.getElementById("quoteContainerId");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("cssLoader");

// Show Loading
function loading() {
	loader.hidden = false;
	quoteContainerId.hidden = true;
}

// Hide Loading
function complete() {
	if (!loader.hidden) {
		quoteContainerId.hidden = false;
		loader.hidden = true;
	}
}

// Get Quote from API
async function getQuote() {
	loading();
	const proxyUrl = "https://cors-anywhere.herokuapp.com/";
	const apiUrl =
		"http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		// If Author is blank, add 'Unknown'
		if (data.quoteAuthor === "") {
			authorText.innerText = "Unknown";
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		// Reduce font size for long quotes
		if (data.quoteText > 120) {
			quoteText.classList.add("longQuote");
		} else {
			quoteText.classList.remove("longQuote");
		}
		quoteText.innerText = data.quoteText;
		// Stop Loader, Show quote
		complete();
	} catch (error) {
		getQuote();
	}
}

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load

getQuote();
