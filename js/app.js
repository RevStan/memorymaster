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

function resetGame () {
  clearInterval(clock);
  nbrClcks = 0
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
  for (i=0; i < modalStars.length; i++) {
    modalStars[i].style.display = 'inline-block';
  }
  nbrClicks.textContent= `Moves: ${moves}`;
  clockDsply = document.querySelector('.timer');
  clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
  
  openCards = [];
  
  startGame();
}//END OF RESET FUNCTION


function flipCards(card) {
  if (clicks === 0) {
    clock = setInterval(startClock, 1000);
    clicks ++;
  }
  if (!card.classList.contains('open') &&
          !card.classList.contains('show') &&
          !card.classList.contains('match')) {
    
       if (openCards.length > 1) {
     // prevent 3rd card
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
  
/* Changing the value moves is compared to
will change the difficulty of the game*/
function calcNbrStars() {
  
  if (moves >= 28) {
    dsplyStars[3].style.color = 'white';
    dsplyStars[2].style.color = 'white';
    dsplyStars[1].style.color = 'white';
    dsplyStars[0].style.color = 'white';
    modalStars[3].style.display = 'none';
    modalStars[2].style.display = 'none';
    modalStars[1].style.display = "none";
    modalStars[0].style.display = "none";
  }
  if (moves >= 24) {
    dsplyStars[3].style.color = 'white';
    dsplyStars[2].style.color = 'white';
    dsplyStars[1].style.color = 'white';
    modalStars[3].style.display = 'none';
    modalStars[2].style.display = 'none';
    modalStars[1].style.display = "none";
    
  }
  if (moves >= 20) {
    dsplyStars[3].style.color = 'white';
    dsplyStars[2].style.color = 'white';
    modalStars[3].style.display = 'none';
    modalStars[2].style.display = 'none';
  } 
  if (moves >= 16) {
    dsplyStars[3].style.color = 'white';
    modalStars[3].style.display = 'none';
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
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });  // turns cards face down
    openCards = [];
  }, 1000); // time delay of 1 sec
  
  /*  Prevents the moves counter from being falsely incremented  */
  if (nbrClcks === 2) {
    incrmNbrClicks ();
  }
   nbrClcks = 0;
} // END OF NOT A MATCH 

// Increments MOVES only when TWO cards have 
// been clicked.
function incrmNbrClicks () {
  moves ++;
  mdlMoves ++;
  nbrClicks.textContent= `Moves: ${moves}`;
  calcNbrStars ();
}// end of incrmCountMoves function

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
  mdlClockDsply.textContent = `You took ${mdlMinutes} Minutes and ${mdlSeconds} seconds!!`;
  playAgain.addEventListener('click', function(e){
    modal.style.display = 'none';
    resetGame();
  });
  noThanks.addEventListener('click', function(e){
    modal.style.display = 'none';
  });
} // END OF  ENDOFGAME 

/*###################################################
      START GAME FUNCTION BEGINS HERE
#################################################### */      
function startGame() {
  loadScreen();
  nbrClicks.textContent= `Moves: ${moves}`;
  const allCards = document.querySelectorAll('.card');
  
  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {

/* The nbrClcks variable is used in the Not A Match function
    to prevent erroneously incrementing the moves counter  
*/
      nbrClcks ++;
 
      if (openCards.length <= 1){
        flipCards(card);
      }
      if (openCards.length == 2) {
        
        console.log('Length of all Cards: ', allCards.length);
         
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
let matchedPairs = 0;
let seconds = 0;
let minutes = 0;
let timer = 0;
let clicks = 0;
let nbrClcks = 0 // controls incrementing Moves countr
let clock = 0;
let openCards = [];
let nbrClicks = document.querySelector('.moves');
const resetButton = document.querySelector('.reset');
const dsplyStars = document.querySelectorAll('.fa-star');
let clockDsply = document.querySelector('.timer');
clockDsply.textContent = `Min: 0${minutes} Sec: 0${seconds}`;
 
const modal = document.querySelector('.modal');
let mdlClockDsply = document.querySelector('.mdlTimer');
const modalStars = document.querySelectorAll('.mdl-star');
const playAgain = document.querySelector('.playAgain');
const noThanks = document.querySelector('.noThanks');
let mdlNbrClicks = document.querySelector('.mdlMoves');
let mdlSeconds = 0;
let mdlMinutes = 0;
let mdlTimer = 0;
let mdlMoves = 0;

startGame();
 