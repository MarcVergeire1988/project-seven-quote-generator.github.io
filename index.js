const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner Shown
function loadingSpinnerShow() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeSpinnerShow() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loadingSpinnerShow();
  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeSpinnerShow();
}

// Get Quotes From API
async function getQuotes() {
  loadingSpinnerShow();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();