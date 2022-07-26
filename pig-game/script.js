'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
/* const total0El = document.getElementById('score--0');
const total1El = document.getElementById('score--1'); */
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//INIT
score0El.textContent = 0;
score1El.textContent = 0;
const scores = [0, 0];
let activePlayer = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let playing = true;

function initGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display random nuimber
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check if 1 then switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //store in the array the current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if more than 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('playerActive');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
