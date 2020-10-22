const container = document.querySelector('.container');
const author = document.getElementById('author');
const quote = document.getElementById('quote');
const newQuote = document.getElementById('new-quote');
const tweet = document.getElementById('tweet');
const loader = document.querySelector('.loader');

function spinner() {
    container.style.display = 'none'; 
    loader.style.display = 'block';
};

function noSpinner() {
    loader.style.display = 'none';
    container.style.display = 'block';
};

async function getQuote() {
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    try {
       spinner();
       const res =  await fetch(proxyUrl);
       const data = await res.json();
       const content = JSON.parse(data.contents); 
       author.textContent = content.quoteAuthor || 'UnKnown Author';
       content.quoteText.length > 120 ? quote.classList.add('container__quote_sm') : quote.classList.remove('container__quote_sm');
       quote.textContent = content.quoteText;
       setTimeout(() => noSpinner(), 300);
    } catch (error) {
        getQuote();
    }
};

async function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(tweetUrl, '_blank');
};

newQuote.addEventListener('click', getQuote);
tweet.addEventListener('click', tweetQuote);

getQuote();