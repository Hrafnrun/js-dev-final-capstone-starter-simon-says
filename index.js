document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.querySelector(".js-start-button");
  const statusSpan = document.querySelector(".js-status");
  const heading = document.querySelector(".js-heading");
  const padContainer = document.querySelector(".js-pad-container");

  let computerSequence = []; // track the computer-generated sequence of pad presses
  let playerSequence = []; // track the player-generated sequence of pad presses
  let maxRoundCount = 0; // the max number of rounds, varies with the chosen level
  let roundCount = 0; // track the number of rounds that have been played so far

 

  const pads = [
      {
          color: "red",
          selector: document.querySelector(".js-pad-red"),
          sound: new Audio("./assets/simon-says-sound-1.mp3"),
      },
      {
          color: "green",
          selector: document.querySelector(".js-pad-green"),
          sound: new Audio("./assets/simon-says-sound-2.mp3"),
      },
      {
          color: "blue",
          selector: document.querySelector(".js-pad-blue"),
          sound: new Audio("./assets/simon-says-sound-3.mp3"),
      },
      {
          color: "yellow",
          selector: document.querySelector(".js-pad-yellow"),
          sound: new Audio("./assets/simon-says-sound-4.mp3"),
      }
  ];

 
  padContainer.addEventListener("click", padHandler);
  startButton.addEventListener("click", startButtonHandler);

function startButtonHandler() {
  setLevel(+document.querySelector("#levelSelect").value);
  roundCount++;

  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");

  playComputerTurn();

  return { startButton, statusSpan };
}


function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;

  const pad = pads.find(pad => pad.color === color);
  pad.sound.play();
  checkPress(color);

  return color;
}


function setLevel(level = 1) {
  switch(level) {
    case 1:
      maxRoundCount = 8;
      break;
    case 2:
      maxRoundCount = 14;
      break;
    case 3:
      maxRoundCount = 20;
      break;
    case 4:
      maxRoundCount = 31;
      break;
    default:
      return "Please enter level 1, 2, 3, or 4";
  }
}


function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}


function setText(element, text) {
  element.innerText = text;
  return element;
}



function activatePad(color) {
  const pad = pads.find(pad => pad.color === color);
  pad.selector.classList.add("activated");
  pad.sound.play();

  setTimeout(() => pad.selector.classList.remove("activated"), 500);
}



function activatePads(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => activatePad(color), (index + 1) * 1000); // if tests fail, change 1000 to 600
  });
}


function playComputerTurn() {
  padContainer.classList.add("unclickable");

  setText(statusSpan, "The computer's turn...");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);

  computerSequence.push(getRandomItem(pads).color)
  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(roundCount), roundCount * 600 + 1000); // 5
}


function playHumanTurn() {
  padContainer.classList.remove("unclickable");
  setText(statusSpan, `Your turn: ${computerSequence.length - playerSequence.length} presses left`);
}


function checkPress(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, `Your turn: ${remainingPresses} presses left`);

  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("Oops! Game over.");
    return;
  }

  if (remainingPresses === 0) {
    checkRound();
  }
}



function checkRound() {
  if (playerSequence.length === maxRoundCount) {
    resetGame("Congrats! You won!");
    return;
  } else {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Nice! Keep going!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

function resetGame(text) {
  computerSequence = [];
  playerSequence = [];
  roundCount = 0;

  alert(text);
  setText(heading, "Simon Says");
  startButton.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");
}
});

/**
* Please do not modify the code below.
* Used for testing purposes.
*
*/
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;