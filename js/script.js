const possible_symbols = ['yellow', 'blue', 'red', 'orange', 'purple', 'pink'];
let cards = document.querySelectorAll('.card');
const placeholders = document.querySelectorAll('.placeholder');
console.log(cards.length);
let card_symbols = [];
Object.defineProperties(Array.prototype, {
    count: {
        value: function(query) {
            var count = 0;
            for(let i=0; i<this.length; i++)
                if (this[i]==query)
                    count++;
            return count;
        }
    }
});
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
for (let i = 0; i < cards.length; i+=1) {
    let symbol = possible_symbols[getRandomInt(6)];
    while (card_symbols.count(symbol) == 2) {
        symbol = possible_symbols[getRandomInt(6)];
    }
    card_symbols.push(symbol);
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
let cardsshown = false;
const showCards = async () => {
    for (let i = 0; i < cards.length; i+=1) {
        cards[i].style.background = card_symbols[i];
    }
    await sleep(3000);
    for (let i = 0; i < cards.length; i+=1) {
        cards[i].style.background = '#2f8245';
    }
    cardsshown = true;
}
let isclicked = false;
let prev;
let fundone = true;
let pairs = 0;
let lives = 3;
showCards();
for (let i = 0; i < cards.length; i += 1) {
    cards[i].addEventListener('click', async () => {
        if (!isclicked && cardsshown) {
            cards[i].style.background = card_symbols[i];
            isclicked = true;
            prev = i;
        }
        else if (isclicked && fundone && cardsshown) {
            fundone = false;
            cards[i].style.background = card_symbols[i];
            await sleep(500);
            if (card_symbols[prev] == card_symbols[i]) {
                cards[prev].style.display = 'none';
                cards[i].style.display = 'none';
                placeholders[prev].style.display = 'block';
                placeholders[i].style.display = 'block';
                pairs += 1;
                if (pairs === 6) {
                    alert('W');
                }
            }
            else {
                cards[prev].style.background = '#2f8245';
                cards[i].style.background = '#2f8245';
                lives -= 1;
                if (lives === 0) {
                    alert('L');
                }
            }
            isclicked = false;
            fundone = true;
        }
    });
}