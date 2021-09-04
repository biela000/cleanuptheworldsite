const possible_symbols = ['img/cardfront1.png', 'img/cardfront2.png', 'img/cardfront3.png', 'img/cardfront4.png', 'img/cardfront5.png', 'img/cardfront6.png'];
const cards = document.querySelectorAll('.card');
const front_cards = document.querySelectorAll('.front');
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
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
let cardsshown = false;
const showCards = async () => {
    for (let i = 0; i < cards.length; i+=1) {
        flipCard(cards[i]);
    }
    //await sleep(3000);
    setTimeout(() => {
        for (let i = 0; i < cards.length; i+=1) {
            flipCard(cards[i]);
        }
        cardsshown = true;
    }, 3000);
}
let isclicked = false;
let prev;
let fundone = true;
let pairs = 0;
let lives = 3;
function flipCard(card) {
    card.classList.toggle("flipCard");
}
function fadeCard(card) {
    card.classList.toggle("fadeCard");
}
function flipX(card) {
    card.classList.toggle("flipX");
}
function unflipX(card) {
    card.classList.toggle("unflipX");
}
for (let i = 0; i < cards.length; i += 1) {
    cards[i].addEventListener('click', () => {
        if (!isclicked && cardsshown) {
            flipCard(cards[i]);
            isclicked = true;
            prev = i;
        }
        else if (isclicked && fundone && cardsshown && prev != i) {
            fundone = false;
            flipCard(cards[i]);
            setTimeout(() => {
                if (card_symbols[prev] == card_symbols[i]) {
                    //fadeCard(cards[prev]);
                    cards[prev].style.opacity = 0;
                    flipCard(cards[prev]);
                    //flipX(cards[prev]);
                    //fadeCard(cards[i]);
                    cards[i].style.opacity = 0;
                    flipCard(cards[i]);
                    //flipX(cards[i]);
                    setTimeout(() => {
                        cards[prev].style.display = 'none';
                        cards[i].style.display = 'none';
                        //flipCard(cards[prev]);
                        //flipCard(cards[i]);
                        //unflipX(cards[prev]);
                        //unflipX(cards[i]);
                        cards[prev].style.opacity = 1;
                        cards[i].style.opacity = 1;
                        placeholders[prev].style.display = 'block';
                        placeholders[i].style.display = 'block';
                        pairs += 1;
                        if (pairs === 6) {
                            for (let i = 0; i < 12; i += 1) {
                                placeholders[i].style.display = 'none';
                            }
                            document.getElementById('w').style.display = 'inline-block';
                        }                        
                        isclicked = false;
                        fundone = true;
                    }, 500);
                }
                else {
                    flipCard(cards[prev]);
                    flipCard(cards[i]);
                    lives -= 1;
                    if (lives === 0) {
                        for (let i = 0; i < 12; i += 1) {
                            if (cards[i].style.display != 'none') {
                                cards[i].style.display = 'none';
                            }
                            else {
                                placeholders[i].style.display = 'none';
                            }
                        }
                        document.getElementById('l').style.display = 'inline-block';
                    }
                    isclicked = false;
                    fundone = true;
                }
            }, 1000);
        }
    });
}
function gameStart() {
    if (document.getElementById('w').style.display != 'none' || document.getElementById('l').style.display != 'none') {
        document.getElementById('w').style.display = 'none';
        document.getElementById('l').style.display = 'none';
        cardsshown = false;
        lives = 3;
        pairs = 0;
        for (let i = 0; i < 12; i += 1) {
            cards[i].style.display = 'block';
        }
        card_symbols = [];
        for (let i = 0; i < cards.length; i+=1) {
            let symbol = possible_symbols[getRandomInt(6)];
            while (card_symbols.count(symbol) == 2) {
                symbol = possible_symbols[getRandomInt(6)];
            }
            card_symbols.push(symbol);
            front_cards[i].src = symbol;
        }
        showCards();
    }
}