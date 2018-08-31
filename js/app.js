const movesField = document.querySelector(".moves");
const timerField = document.querySelector(".timer");
const starsField = document.querySelector(".stars");
const modal = document.querySelector(".modal");
const restartButton = document.querySelector(".restart");
const playButton = document.querySelector(".playButton");
const cardsDeck = $('.deck');
const totalMoves = document.querySelector("#totalMoves");
const totalTime = document.querySelector("#totalTime");
const totalRate = document.querySelector("#totalRate");

let cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
let openedCards = [];
let matchedCards = [];
let totalSeconds = 0;
let firstClick = true;
let timer;
let move = 0;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
 
let shuffledCards = shuffle(cards);

function createHTML(name) {
    return `<li class="card"><i class="${name}"></i></li>`;
}
 
function doHTML() {
    shuffledCards.forEach(element => {
        cardsDeck.append(createHTML(element));
    });
}

function addToOpenedCard(card){
    openedCards.push(card);
}

function checkCards(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.className = "card open show match disable";
        previousCard.className = "card open show match disable";
        matchedCards.push(currentCard, previousCard);
        checkEndGame();
    } else {
        setTimeout(function () {
            currentCard.className = "card";
            previousCard.className = "card";
        }, 500)

    }
}
function writeMoves(count) {
    movesField.innerHTML = count;
}

function startTimer() {
    timer = setInterval(function() {
      totalSeconds++;
      timerField.innerHTML = totalSeconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function rating() {
  if (movesField.innerHTML > 20 && movesField.innerHTML < 35) {
    starsField.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
  } else if (movesField.innerHTML >= 35) {
    starsField.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else {
    starsField.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  }
}

function checkEndGame() {
    if (cards.length === matchedCards.length) {
        modal.style.display = "block";
        totalMoves.innerHTML = parseInt(movesField.innerHTML) + 1; 
        totalRate.innerHTML = starsField.innerHTML;
        stopTimer();
        totalTime.innerHTML = totalSeconds;
    }
}

function clickCard(){
    let cardsDeck = document.querySelector(".deck");
    let cards = Array.from(cardsDeck.children); //to enable forEach loop

    cards.forEach(elem => elem.addEventListener("click", function () {
        let currentCard = this; 
        let previousCard = openedCards[0]; 

        if(firstClick) {
            startTimer();
            firstClick = false; 
        }

        if (openedCards.length === 1) {
            currentCard.className = "card show disable";
            addToOpenedCard(currentCard);
            checkCards(currentCard, previousCard);
            openedCards = [];

        } else {
            currentCard.className = "card show disable";
            addToOpenedCard(currentCard);
        } move++;
        writeMoves(move);
        rating();
    }));
    } 


function reset(){
    document.querySelectorAll(".card").forEach(elem => {
        elem.className = "card";
    })
    starsField.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    movesField.innerHTML = 0;
    timerField.innerHTML = 0;
    openedCards = [];
    matchedCards = [];
    totalSeconds = 0;
    firstClick = true;
    move = 0;
    stopTimer();
}

restartButton.addEventListener("click", function(){
    reset();
});

playButton.addEventListener("click", function(){
    reset();
    modal.style.display = 'none';
});

function start(){
    doHTML();
    clickCard();
}

$(document).ready(function(){
    start();
});
