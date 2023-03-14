// to fetch the current year in copyright
// document.getElementById("year").innerHTML = new Date().getFullYear();

// for main.html
const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
const comRock = document.getElementById("com-rock");
const comPaper = document.getElementById("com-paper");
const comScissors = document.getElementById("com-scissors");
const playerChoice = document.querySelectorAll(".player-choice");
const result = document.getElementById("result");
const boxRandom = document.getElementById("box-random");

let player;
let computer;

playerChoice.forEach((button) =>
  button.addEventListener("click", () => {
    player = button;
    computerSpin();
    setTimeout(() => {
      computerTurn();
      checkWinner();
    }, 5000);
  })
);

function computerTurn() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  comRock.classList.remove("com-choice");
  comPaper.classList.remove("com-choice");
  comScissors.classList.remove("com-choice");

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

  comRock.classList.remove("com-choice");
  comPaper.classList.remove("com-choice");
  comScissors.classList.remove("com-choice");

  boxRandom.classList.add("box-random");
}

function checkWinner() {
  boxRandom.classList.remove("box-random");

  if (player.value == computer.value) {
    return result.setAttribute(
      "class",
      "draw animate__animated animate__zoomIn"
    );
  } else if (computer == comRock) {
    return player == playerPaper
      ? result.setAttribute(
          "class",
          "player-win animate__animated animate__zoomIn"
        )
      : result.setAttribute(
          "class",
          "com-win animate__animated animate__zoomIn"
        );
  } else if (computer == comPaper) {
    return player == playerScissors
      ? result.setAttribute(
          "class",
          "player-win animate__animated animate__zoomIn"
        )
      : result.setAttribute(
          "class",
          "com-win animate__animated animate__zoomIn"
        );
  } else if (computer == comScissors) {
    return player == playerRock
      ? result.setAttribute(
          "class",
          "player-win animate__animated animate__zoomIn"
        )
      : result.setAttribute(
          "class",
          "com-win animate__animated animate__zoomIn"
        );
  }
}

document.querySelector(".refresh").addEventListener("click", () => {
  result.setAttribute("class", "result");

  comRock.classList.remove("com-choice");
  comPaper.classList.remove("com-choice");
  comScissors.classList.remove("com-choice");
});
