function UI(word) {
  //ui elements
  this.word = word;
  this.playBtn = document.querySelector(".play-btn");
  this.category = document.querySelector("#category");
  this.bodyParts = document.querySelectorAll(".body-part");
  this.lettersPlayed = document.querySelector("#letters-played");
  this.wordContainer = document.querySelector(".word-container");
  this.container = document.querySelector(".container");
  this.init();
}

UI.prototype.init = function() {
  this.togglePlayBtn();
  this.showGameContainer();
};
UI.prototype.togglePlayBtn = function() {
  this.playBtn.classList.toggle("hidden");
};

UI.prototype.showGameContainer = function() {
  this.container.classList.toggle("hidden");
  this.showWord();
};

UI.prototype.showWord = function(correctLetters = []) {
  const wordLetters = this.word.split("");
  wordLetters.forEach((letter, index) => {
    const div = document.createElement("div");
    div.className = "word-letter";
    div.id = `letter-${index}`;

    const result = correctLetters.includes(letter) ? letter : "";

    const html = `
      <p class="letter">${result}</p>
    `;
    div.innerHTML = html;

    this.wordContainer.appendChild(div);
  });
};

function Hangman(ui) {
  this.words = ["application", "pale", "background", "packers"];
  this.word = this.words[
    Math.floor(Math.random() * this.words.length)
  ].toUpperCase();
  this.ui = new UI(this.word);
  this.correctLetters = [];

  document.querySelector(".input").addEventListener("click", e => {
    if (e.target.classList.contains("input-letter")) {
      //check if letter has been played
      //guess logic
    }
  });
}

function App() {
  //add event listeners
  //play new game
  let game;
  document.querySelector(".play-btn").addEventListener("click", () => {
    game = new Hangman();
  });
}

const app = new App();
