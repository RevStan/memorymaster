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

// Increments MOVES only when TWO cards have 
// been clicked.
function incrmNbrClicks () {
  moves ++;
  mdlMoves ++;
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
  if (moves >= 3) {
        dsplyStars[3].style.color = 'white';
        dsplyStars[2].style.color = 'white';
  } 
  if (moves >= 2) {
    dsplyStars[3].style.color = 'white';
    modalStars[3] = '';
  }
 }   
        
function resetGame () {
  clearInterval(clock);
  seconds = 0;
  minutes = 0;
  timer = 0;
  mdlSeconds = 0;
  mdlMinutes = 0;
  mdlTimer = 0;
  moves = 0;
  matchedPairs = 0;
  clicks = 0;
  mdlMoves = 0;
  clock = 0;
  for (i=0; i < dsplyStars.length; i++) {
    dsplyStars[i].style.color = 'blue';
  }
  nbrClicks.textContent= `Moves: ${moves}`;
  clockDsply = document.querySelector('.timer');
  clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
  
  openCards = [];
  
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
    // Indicates THIRD card clicked  
    // PREVENT clicking more than two cards 
    // Works except when cards match / needs work
    } else {
        openCards.push(card);
        card.classList.add('open', 'show');
    }
  }
} // END OF FLIP CARDS FUNCTION

function startClock() {
  seconds ++;
  if (seconds <= 9) {
    clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
  } else {
    clockDsply.textContent = `Min: 0${minutes} Sec: ${seconds}`;
  }
  if (seconds >= 59) {
    minutes += 1;
    seconds = 0;
  }
  mdlSeconds = seconds;
  mdlMinutes = minutes;
} // END OF START CLOCK 

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
    endOfGame ();
  }
}// END OF INCRM MATCHED PAIRS 

function endOfGame() {
  clearInterval(clock);
  modal.style.display = 'block';
   
  mdlNbrClicks.textContent= `You made ${mdlMoves} Moves!`;
  
  mdlClockDsply.textContent = `You took 0${mdlMinutes} Minutes and 0${mdlSeconds} seconds!!`;
  
    
  //modalStars.textContent = `Earning you a ${modalStars} rating!`;
  
  playAgain.addEventListener('click', function(e){
    modal.style.display = 'none';
    resetGame();
  });
  noThanks.addEventListener('click', function(e){
    modal.style.display = 'none';
  });
} // END OF  ENDOFGAME 



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

// INITIAL SETTING OF VARIABLES
let moves = 0;
let matchedPairs = 7;
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


const modal = document.querySelector('.modal');
let mdlClockDsply = document.querySelector('.mdlTimer');
const playAgain = document.querySelector('.playAgain');
const noThanks = document.querySelector('.noThanks');
const modalStars = document.querySelectorAll('.fa-star');  

let mdlSeconds = 0;
let mdlMinutes = 0;
let mdlTimer = 0;
let mdlMoves = 0;
let mdlNbrClicks = document.querySelector('.mdlMoves');

/*modalClock.textContent = `Min: 0${mdlMinutes} Sec: 0${mdlSeconds}`;*/

startGame();