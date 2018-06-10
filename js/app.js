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
}// Called from both MATCH and NO MATCH logic

function incrmNbrClicks () {
  moves ++;
  nbrClicks.textContent= `Moves: ${moves}`;
  calcNbrStars ();
}// end of incrmCountMoves function

function calcNbrStars() {
  if (moves >= 3) {
    dsplyStars[2].style.color = 'white';
  }
  if (moves >= 4) {
        dsplyStars[1].style.color = 'white';
  }
  if (moves >= 5) {
    dsplyStars[0].style.color = 'white';
  }
}
     
function resetGame () {
  //loadScreen();
  moves = 0;
  matchedPairs = 0;
  openCards = [];
  dsplyStars[0].style.color = 'blue';
  dsplyStars[1].style.color = 'blue';
  dsplyStars[2].style.color = 'blue';
  nbrClicks.textContent= `Moves: ${moves}`;
}//END OF RESET FUNCTION

function resetMatchedCards () {
  console.log();
  console.log('inside reset Matched Cards');
  let cardHTML = (cards).map(function(card)
    {
      return generateCard(card);
    });
  deck.innerHTML = cardHTML.join("");
}

// NOT WORKING FOR INIT
      /*function initCountMoves () {
        moves = 0;
        nbrClicks.textContent= `Moves: ${moves}`; 
      }*/

function flipCards(card) {
 
  if (!card.classList.contains('open') &&
          !card.classList.contains('show') &&
          !card.classList.contains('match')) {
    if (openCards.length > 1) {
    // bypass third card click, prevent
    // clicking more than two cards 
    // Except when cards match needs work          
    } else {
        openCards.push(card);
        card.classList.add('open', 'show');
    }
  }
} // END OF FLIP CARDS FUNCTION

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
} // END OF startGame function
  
let moves = 0;
let matchedPairs = 0;
let openCards = [];

let nbrClicks = document.querySelector('.moves');
const resetButton = document.querySelector('.reset');
const dsplyStars = document.querySelectorAll('.fa-star');

startGame();

nbrClicks.textContent= `Moves: ${moves}`;
const allCards = document.querySelectorAll('.card');
   
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
    
allCards.forEach(function(card) {
  
  card.addEventListener('click', function(e) {
       
    flipCards(card);
    if (openCards.length == 2) {
      checkForMatch(card);
    }
    resetButton.addEventListener('click', function(e){
      resetGame(card);
    });
  }); // end of event listener for each card
    
  
}); // end of building allCards.
