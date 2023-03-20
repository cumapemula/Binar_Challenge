// Inisialisasi Variabel DOM
const playerSelected = document.querySelectorAll(".player-choice");
const comRock = document.getElementById("com-rock");
const comPaper = document.getElementById("com-paper");
const comScissors = document.getElementById("com-scissors");
const result = document.getElementById("result");
const boxSpin = document.getElementById("box-spin");
const playerScore = document.getElementById("player-score");
const comScore = document.getElementById("com-score");
const audio = document.getElementById("audio");

// Array for constructor
const choices = ["rock", "paper", "scissors"];
// Parent Class
class Games {
  constructor(choice) {
    this.choice = choice;
    this.win = true;
    this.pScore = 0;
    this.cScore = 0;
  }
  setWin(win) {
    this.win = win;
    if (win) {
      this.pScore++;
      playerScore.innerText = this.pScore;
      audio.setAttribute("src", "./assets/audio/win.mp3");
      return result.setAttribute("class", "player-win");
    } else if (!win) {
      this.cScore++;
      comScore.innerText = this.cScore;
      audio.setAttribute("src", "./assets/audio/lose.mp3");
      return result.setAttribute("class", "com-win");
    }
  }
}
// Sub Class of Games
class Player extends Games {
  constructor(choice) {
    super(choice);
  }
}
// Sub Class of Games
class Computer extends Games {
  constructor(choice) {
    super(choice);
  }
  turn() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    this.removeBox();
    console.log(randomNumber);
    switch (randomNumber) {
      case 1:
        this.choice = "rock";
        comRock.classList.add("com-choice");
        console.log(`Computer ${this.choice}`);
        break;
      case 2:
        this.choice = "paper";
        comPaper.classList.add("com-choice");
        console.log(`Computer ${this.choice}`);
        break;
      case 3:
        this.choice = "scissors";
        comScissors.classList.add("com-choice");
        console.log(`Computer ${this.choice}`);
        break;
    }
  }
  spin() {
    audio.setAttribute("src", "./assets/audio/spin.mp3");
    result.setAttribute("class", "result");
    this.removeBox();
    boxSpin.classList.add("box-spin");
  }
  removeBox() {
    comRock.classList.remove("com-choice");
    comPaper.classList.remove("com-choice");
    comScissors.classList.remove("com-choice");
  }
}

const games = new Games(choices);
const player = new Player(choices);
const com = new Computer(choices);

function checkWinner() {
  boxSpin.classList.remove("box-spin");
  if (player.choice == com.choice) {
    audio.setAttribute("src", "./assets/audio/draw.mp3");
    return result.setAttribute("class", "draw");
  } else if (com.choice == "rock") {
    return player.choice == "paper" ? games.setWin(true) : games.setWin(false);
  } else if (com.choice == "paper") {
    return player.choice == "scissors"
      ? games.setWin(true)
      : games.setWin(false);
  } else if (com.choice == "scissors") {
    return player.choice == "rock" ? games.setWin(true) : games.setWin(false);
  }
}

playerSelected.forEach((button) => {
  button.addEventListener("click", () => {
    player.choice = button.value;
    console.log(`Player ${player.choice}`);
    com.spin();
    setTimeout(() => {
      com.turn();
      checkWinner();
    }, 8000);
  });
});

// Reset Score
document.querySelector(".reset").addEventListener("click", () => {
  games.pScore = 0;
  games.cScore = 0;
  playerScore.innerText = games.pScore;
  comScore.innerText = games.cScore;
  audio.setAttribute("src", "");
  com.removeBox();
});

// Reload / Refresh
document.querySelector(".refresh").addEventListener("click", () => {
  com.removeBox();
  result.setAttribute("class", "result");
  audio.setAttribute("src", "");
});
