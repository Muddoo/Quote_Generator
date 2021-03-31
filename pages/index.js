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
    const apiUrl = `https://api.quotable.io/random`;
    try {
       spinner();
       const res =  await fetch(apiUrl);
       const data = await res.json();
       author.textContent = data.author || 'UnKnown Author';
       quote.textContent = data.content;
       setTimeout(() => noSpinner(), 300);
       data.length > 120 ? quote.classList.add('container__quote_sm') : quote.classList.remove('container__quote_sm');
    } catch (error) {
        getQuote();
    }
};

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(tweetUrl, '_blank');
};

newQuote.addEventListener('click', getQuote);
tweet.addEventListener('click', tweetQuote);

getQuote();