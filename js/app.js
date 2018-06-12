// * Create a list that holds all of your cards *
let cards = ["fa-diamond", "fa-diamond",
             "fa-paper-plane-o", "fa-paper-plane-o",
             "fa-anchor", "fa-anchor",
             "fa-bolt", "fa-bolt",
             "fa-cube", "fa-cube",
             "fa-leaf", "fa-leaf",
             "fa-bomb", "fa-bomb",
             "fa-bicycle", "fa-bicycle"
            ];
     
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function loadScreen() {
  let deck = document.querySelector(".deck");
  shuffle(cards);
  let cardHTML = (cards).map(function(card)
    {
    return generateCard(card);
    });
  deck.innerHTML = cardHTML.join("");
} 
// end of loadScreen function
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// Called from both MATCH and NO MATCH logic
// increments moves only when TWO cards have 
// been clicked.
function incrmNbrClicks () {
  moves ++;
  nbrClicks.textContent= `Moves: ${moves}`;
  calcNbrStars ();
}// end of incrmCountMoves function

/* Changing the value moves is compared to
will change the difficulty of the game*/
function calcNbrStars() {
  if (moves >= 24) {
    dsplyStars[3].style.color = 'white';
    dsplyStars[2].style.color = 'white';
    dsplyStars[1].style.color = 'white';
    dsplyStars[0].style.color = 'white';
  }
  if (moves >= 20) {
    dsplyStars[3].style.color = 'white';
    dsplyStars[2].style.color = 'white';
    dsplyStars[1].style.color = 'white';
  }
  if (moves >= 16) {
        dsplyStars[3].style.color = 'white';
        dsplyStars[2].style.color = 'white';
  } 
  if (moves >= 12) {
    dsplyStars[3].style.color = 'white';
  }
}   
       
function resetGame () {
  clearInterval(clock);
  clockDsply = document.querySelector('.timer');
  console.log('value of clock display: ', timer);
  clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
  moves = 0;
  matchedPairs = 0;
  seconds = 0;
  minutes = 0;
  timer = 0;
  clicks = 0;
  clock = 0;
  openCards = [];
  for (i=0; i < dsplyStars.length; i++) {
    dsplyStars[i].style.color = 'blue';
  }
nbrClicks.textContent= `Moves: ${moves}`;


  startGame();
}//END OF RESET FUNCTION

// NOT WORKING FOR INIT
      /*function initCountMoves () {
        moves = 0;
        nbrClicks.textContent= `Moves: ${moves}`; 
      }*/

function flipCards(card) {
  if (clicks === 0) {
    clock = setInterval(startClock, 1000);
    clicks ++;
  }
 
  if (!card.classList.contains('open') &&
          !card.classList.contains('show') &&
          !card.classList.contains('match')) {
    if (openCards.length > 1) {
    // PREVENT clicking more than two cards 
    // Works except when cards match needs work          
    } else {
        openCards.push(card);
        card.classList.add('open', 'show');
    }
  }
} // END OF FLIP CARDS FUNCTION

function startClock() {
  seconds++;

  if (seconds <= 9) {
    clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
  } else {
    clockDsply.textContent = `Min: 0${minutes} Sec: ${seconds}`;
  }

  if (seconds >= 59) {
    minutes += 1;
    // -1 here ensures seconds start at 0 every minute change
    seconds = -1;
  }
}

function checkForMatch (card) {
  if (openCards[0].dataset.card == openCards[1].dataset.card) {
                // cards match leave faceup
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
    incrmNbrClicks ();
    incrmMatchedPairs ();
  } else {
    notAMatch(card);                  
  }
} // END OF CHECK FOR MATCH

function notAMatch () {
  //if cards don't match go away
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });  // turns cards face down
    openCards = [];  
  }, 1000); // time delay of 1 sec
  incrmNbrClicks ();
} // END OF NOT A MATCH 

function incrmMatchedPairs () {
  matchedPairs ++;
  if (matchedPairs == 8) {
  //  endOfGame ();
  }
}
  
function startGame() {
  loadScreen();
  
  nbrClicks.textContent= `Moves: ${moves}`;
  const allCards = document.querySelectorAll('.card');
  
  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      flipCards(card);
      if (openCards.length == 2) {
        checkForMatch(card);
      }
      resetButton.addEventListener('click', function(e){
        resetGame();
      });
    }); // end of event listener for each card
  }); // end of building allCards.
} // END OF startGame function

let moves = 0;
let matchedPairs = 0;
let seconds = 0;
let minutes = 0;
let timer = 0;
let clicks = 0;
let clock = 0;
let openCards = [];
let nbrClicks = document.querySelector('.moves');
const resetButton = document.querySelector('.reset');
const dsplyStars = document.querySelectorAll('.fa-star');
let clockDsply = document.querySelector('.timer');
clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
clicks = 0;
clock = 0;

startGame();

/* set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
   
//################################################################
