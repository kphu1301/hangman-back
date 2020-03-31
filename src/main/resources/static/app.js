function UI() {
  //ui elements
  this.playBtn = document.querySelector(".play-btn");
  this.category = document.querySelector("#category");
  this.bodyParts = document.querySelectorAll(".body-part");
  this.guessedLetters = document.querySelector(".guessed-letters");
  this.wordContainer = document.querySelector(".word-container");
  this.container = document.querySelector(".container");
  this.inputLetters = document.querySelectorAll(".input-letter");
  this.resultContainer = document.querySelector(".result-container");
  this.result = document.querySelector(".result");
}

UI.prototype.init = function(word) {
  this.word = word;
  this.playBtn.className = "play-btn hidden";
  this.showGameContainer();
};

UI.prototype.resetUI = function() {
  //clear word
  this.word = "";
  this.wordContainer.innerHTML = "";

  //hide body parts
  this.bodyParts.forEach(bodyPart => {
    bodyPart.classList = "body-part hidden";
  });

  //clear guessed letters
  this.guessedLetters.innerHTML = "";
  this.inputLetters.forEach(inputLetter => {
    inputLetter.className = "input-letter";
  });

  //clear result
  this.result.innerHTML = "";
  this.result.className = "result";
  this.resultContainer.className = "result-container hidden";

  //
};

UI.prototype.showGameContainer = function() {
  if (this.container.classList.contains("hidden")) {
    this.container.classList.remove("hidden");
  }
  this.showWord();
};

UI.prototype.showWord = function() {
  this.word.forEach(() => {
    const div = document.createElement("div");
    div.className = "word-letter";

    this.wordContainer.appendChild(div);
  });
};

UI.prototype.updateGuessedLetters = function(guessedLetters = []) {
  console.log(guessedLetters);
  this.guessedLetters.innerText = `
    ${guessedLetters}
  `;
};

UI.prototype.updateWord = function(guessedLetters = []) {
  let matches = 0;
  const wordLetters = document.querySelectorAll(".word-letter");
  this.word.forEach((wordLetter, index) => {
    if (
      wordLetters[index].innerHTML === "" &&
      guessedLetters.includes(wordLetter)
    ) {
      wordLetters[index].innerHTML = `
        <p class="letter">${wordLetter}</p>
      `;
      matches++;
    }
  });

  return matches;
};

UI.prototype.showResult = function(gameResult, msg) {
  if (gameResult === "WIN") {
    this.result.classList.add("result-win");
  } else if (gameResult === "LOSS") {
    this.result.classList.add("result-loss");
  }
  this.result.innerText = msg;

  const div = document.createElement("div");
  div.className = "play-again";

  div.innerHTML = `
    <button class='play-btn play-again'>Play New Game</button>
  `;
  this.result.appendChild(div);
  this.resultContainer.classList.remove("hidden");
};

function Hangman() {
  this.words = ["application", "pale", "background", "packers"];
  this.ui = new UI();
  this.guessedLetters = [];
  this.wrongGuesses = 0;
  this.maxGuesses = 6;
  this.correctGuesses = 0;
  this.gameStatus = "IN_PROGRESS";
  this.init();
}

Hangman.prototype.init = function() {
  this.word = this.words[Math.floor(Math.random() * this.words.length)]
    .toUpperCase()
    .split("");
  this.ui.init(this.word);
  //add event listener for input
  document.querySelector(".input").addEventListener("click", e => {
    //listen for unguessed letters
    if (
      e.target.classList.contains("input-letter") &&
      !this.guessedLetters.includes(e.target.id) &&
      this.wrongGuesses < this.maxGuesses &&
      this.correctGuesses < this.word.length
    ) {
      this.makeGuess(e);
    }
  });
};

Hangman.prototype.makeGuess = function(e) {
  //add guess to guessed-letters
  this.guessedLetters.push(e.target.id);

  // correct guess
  if (this.word.includes(e.target.id)) {
    e.target.classList.add("correct");
    let matches = this.ui.updateWord(this.guessedLetters);
    this.correctGuesses += matches;
    console.log(this.correctGuesses);
  } else {
    e.target.classList.add("guessed");
    //update hangman body
    this.ui.bodyParts[this.wrongGuesses].classList.remove("hidden");
    this.wrongGuesses++;
  }
  this.ui.updateGuessedLetters(this.guessedLetters);
  this.checkGameStatus();
};

Hangman.prototype.resetUI = function() {
  this.ui.resetUI();
};

Hangman.prototype.checkGameStatus = function() {
  if (this.correctGuesses === this.word.length) {
    this.gameStatus = "WIN";
    this.ui.showResult(
      this.gameStatus,
      `Congratulations! You Win With ${this.maxGuesses -
        this.wrongGuesses} Guesses Left!`
    );
  } else if (this.wrongGuesses === this.maxGuesses) {
    this.gameStatus = "LOSS";
    this.ui.showResult(
      this.gameStatus,
      `Game Over, You Lose! Word: ${this.word.join("")}`
    );
  }
};

function App() {
  //add event listeners
  //play new game

  let game;
  document.querySelector(".play-btn").addEventListener("click", () => {
    game = new Hangman();
  });
  document.querySelector(".result").addEventListener("click", e => {
    if (e.target.classList.contains("play-again")) {
      game.resetUI();
      game = new Hangman();
    }
  });
}

const app = new App();
