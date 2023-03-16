// inisialiasasi variabel
const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
const comRock = document.getElementById("com-rock");
const comPaper = document.getElementById("com-paper");
const comScissors = document.getElementById("com-scissors");
const playerChoice = document.querySelectorAll(".player-choice");
const result = document.getElementById("result");
const boxRandom = document.getElementById("box-random");
const playerScore = document.getElementById("player-score");
const comScore = document.getElementById("com-score");
const resetScore = document.querySelector(".reset");
const audio = document.getElementById("audio");

let player;
let computer;
let playerTotal = 0;
let comTotal = 0;

playerChoice.forEach((button) =>
  button.addEventListener("click", () => {
    player = button;
    computerSpin();
    setTimeout(() => {
      computerTurn();
      checkWinner();
      addAudio();
      addScore();
    }, 8000);
  })
);

function computerTurn() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  removeComClass();
  switch (randomNumber) {
    case 1:
      computer = comRock;
      comRock.classList.add("com-choice");
      console.log("Computer Rock!");
      break;
    case 2:
      computer = comPaper;
      comPaper.classList.add("com-choice");
      console.log("Computer Paper!");
      break;
    case 3:
      computer = comScissors;
      comScissors.classList.add("com-choice");
      console.log("Computer Scissors!");
      break;
  }
}

function computerSpin() {
  result.setAttribute("class", "result");
  removeComClass();
  audio.setAttribute("src", "./assets/audio/spin.mp3");
  boxRandom.classList.add("box-random");
}

function checkWinner() {
  boxRandom.classList.remove("box-random");

  if (player.value == computer.value) {
    return result.setAttribute("class", "draw");
  } else if (computer == comRock) {
    return player == playerPaper
      ? result.setAttribute("class", "player-win")
      : result.setAttribute("class", "com-win");
  } else if (computer == comPaper) {
    return player == playerScissors
      ? result.setAttribute("class", "player-win")
      : result.setAttribute("class", "com-win");
  } else if (computer == comScissors) {
    return player == playerRock
      ? result.setAttribute("class", "player-win")
      : result.setAttribute("class", "com-win");
  }
}

document.querySelector(".refresh").addEventListener("click", () => {
  result.setAttribute("class", "result");
  removeComClass();
});

function addScore() {
  if (result.classList.value == "player-win") {
    playerTotal++;
    playerScore.innerText = playerTotal;
  } else if (result.classList.value == "com-win") {
    comTotal++;
    comScore.innerText = comTotal;
  }
}

resetScore.addEventListener("click", () => {
  playerScore.innerText = 0;
  comScore.innerText = 0;
  removeComClass();
  result.setAttribute("class", "result");
});

function removeComClass() {
  comRock.classList.remove("com-choice");
  comPaper.classList.remove("com-choice");
  comScissors.classList.remove("com-choice");
}

function addAudio() {
  if (result.classList.value == "player-win") {
    audio.setAttribute("src", "./assets/audio/win.mp3");
  } else if (result.classList.value == "com-win") {
    audio.setAttribute("src", "./assets/audio/lose.mp3");
  } else if (result.classList.value == "draw") {
    audio.setAttribute("src", "./assets/audio/draw.mp3");
  }
}
