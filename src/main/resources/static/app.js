class UI {
  constructor() {
    this.playGameEl = document.querySelector(".play-btn");
    this.promptEl = document.querySelector("#prompt");
    this.containerEl = document.querySelector(".container");
  }
  showUnderscores(word, gameDiv) {
    const div = document.createElement("div");
    div.className = "word-container";

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.innerHTML = `
      <h2 id="category">Category: ${category}</h2>
    `;

    gameDiv.appendChild(categoryDiv);

    let html = "";
    for (let i = 0; i < word.length; i++) {
      html += `
        <h1 class="word-letter letter-${word[i]} d-inline" id="letter-${i}">__&nbsp</h1>
      `;
    }
    div.innerHTML = html;
    gameDiv.appendChild(div);
    gameDiv.appendChild(document.createElement("br"));
  }

  initGame(word) {
    //create game container
    const gameDiv = document.createElement("div");
    gameDiv.className = "game-container";

    //show word
    ui.showUnderscores(word, gameDiv);

    //show user input
    ui.showInputLetters(gameDiv);

    //insert before playGame Button
    this.playGameEl.insertAdjacentElement("beforebegin", gameDiv);
    this.togglePlayGame("hide");
  }

  changeGuessState(button, state) {
    if (state === "initial") {
      button.dataset.status = state;
      button.classList.replace("btn-secondary", "btn-warning");
      button.classList.replace("btn-success", "btn-warning");
    } else if (state === "guessed") {
      button.classList.replace("btn-warning", "btn-secondary");
      button.dataset.status = "guessed";
    } else if (state === "correct") {
      button.classList.replace("btn-warning", "btn-success");
      button.dataset.status = "correct";
    }
  }

  togglePlayGame(status) {
    if (status === "show") {
      this.playGameEl.style = "display: visible";
    } else {
      this.playGameEl.style = "display: none";
    }
  }

  gameOver(won, message) {
    const div = document.createElement("div");
    if (won) {
      div.className = "result-win alert alert-success";
    } else {
      div.className = "result-loss alert alert-danger";
    }
    div.appendChild(document.createTextNode(message));

    document
      .querySelector(".category")
      .insertAdjacentElement("beforebegin", div);

    this.togglePlayGame("show");
    setTimeout(() => {
      div.remove();
      document.querySelector(".game-container").remove();
    }, 5000);
  }
  reveal(letter) {
    const letterDivs = document.querySelectorAll(`.letter-${letter}`);
    letterDivs.forEach(letterDiv => {
      letterDiv.innerHTML = `<u>${letter}</ul>`;
    });
  }

  showInputLetters(gameDiv) {
    const a = 65;
    const z = 65 + 25;

    const div = document.createElement("div");
    div.className = "input-letters";
    div.id = "input-letters";

    for (let i = a; i <= z; i++) {
      let button = document.createElement("button");
      button.className = "input-letter btn btn-warning border border-dark";
      button.id = String.fromCharCode(i);
      button.dataset.status = "false";
      button.textContent = button.id;

      button.addEventListener("click", guess);
      div.appendChild(button);
    }

    gameDiv.appendChild(div);
  }
}

function guess(e) {
  if (numGuesses != 0) {
    // check guess
    if (e.target.dataset.status === "false") {
      let guess = false;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === e.target.id) {
          //letter is correct, show matching letter
          ui.reveal(word[i]);
          guess = true;
        }
      }
      if (guess) {
        ui.changeGuessState(e.target, "correct");
        correctGuesses++;
        if (correctGuesses === word.length) {
          ui.gameOver(
            true,
            `Game Over, You Win with ${numGuesses} guesses left!`
          );
        }
      } else {
        ui.changeGuessState(e.target, "guessed");
        numGuesses--;
        if (numGuesses == 0) {
          ui.gameOver(false, `Game Over, You Lose! Word was ${word}`);
        }
      }
    }
  }
  e.preventDefault();
}

const words = ["truck", "airplane", "basketball", "pizza"];
let numGuesses;
let category;
let correctGuesses;
const ui = new UI();

// play new game event
ui.playGameEl.addEventListener("click", startNewGame);
function startNewGame(e) {
  //hide new gae button
  ui.playGameEl.style = "display: none";

  //get word
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  category = "Things";

  numGuesses = 6;
  correctGuesses = 0;
  console.log(word);

  ui.initGame(word);
}
