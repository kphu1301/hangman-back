class UI {
  constructor() {
    this.playGameEl = document.querySelector(".play-btn");
    this.titleEl = document.querySelector("#title");
    this.containerEl = document.querySelector(".container");
  }
  showWordHidden(word, gameDiv) {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.innerHTML = `
    <h2>Category: ${gameState.category}
    `;
    gameDiv.appendChild(categoryDiv);

    const guessesLeftDiv = document.createElement("div");
    guessesLeftDiv.className = "guesses-left";
    guessesLeftDiv.innerHTML = `
      <h3>Guesses Left: ${gameState.currNumGuesses}</h4>
    `;
    gameDiv.appendChild(guessesLeftDiv);

    const wordDiv = document.createElement("div");
    wordDiv.className = "word-container";
    for (let i = 0; i < word.length; i++) {
      let letterDiv = document.createElement("div");
      if (word[i] === " ") {
        letterDiv.className = "word-letter space";
      } else {
        letterDiv.className = "word-letter";
      }

      wordDiv.appendChild(letterDiv);
    }
    gameDiv.appendChild(wordDiv);
  }

  initGame(word) {
    //create game container
    const gameDiv = document.createElement("div");
    gameDiv.className = "game-container";

    //show word
    ui.showWordHidden(word, gameDiv);

    //show user input
    ui.showInputLetters(gameDiv);

    //insert before playGame Button
    this.playGameEl.insertAdjacentElement("beforebegin", gameDiv);
    this.togglePlayGame("hide");
  }

  updateGuessesLeft() {
    document.querySelector(".guesses-left").innerHTML = `
      <h3>Guesses Left: ${gameState.currNumGuesses}</h3>
    `;
  }
  changeGuessState(button, state) {
    if (state === "initial") {
      button.className = "input-letter";
    } else if (state === "guessed") {
      button.className = "input-letter guessed";
    } else if (state === "correct") {
      button.className = "input-letter correct";
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
      div.className = "result win";
    } else {
      div.className = "result loss";
    }
    div.appendChild(document.createTextNode(message));

    document
      .querySelector(".category")
      .insertAdjacentElement("beforebegin", div);

    setTimeout(() => {
      div.remove();
      document.querySelector(".game-container").remove();
      this.togglePlayGame("show");
    }, 7000);
  }

  reveal(letter, data) {
    const letterDivs = document.querySelectorAll(`.word-letter`);
    for (let i = 0; i < gameState.revealedLetters.length; i++) {
      if (data.revealedLetters[i] !== null) {
        if (gameState.revealedLetters[i] === null) {
          letterDivs[i].innerHTML = `
          <p>${letter}</p>
          `;
          letterDivs[i].className = "word-letter correct";
        }
      }
    }
  }

  showInputLetters(gameDiv) {
    const a = 65;
    const z = 65 + 25;

    const div = document.createElement("div");
    div.className = "input-letters";
    div.id = "input-letters";

    for (let i = a; i <= z; i++) {
      let button = document.createElement("button");
      button.className = "input-letter";
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
  if (gameState.currNumGuesses != 0) {
    // check guess
    if (e.target.dataset.status === "false") {
      let guess = {
        gameId: gameState.id,
        guess: e.target.id
      };

      fetch(`http://localhost:8080/games/${gameState.id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(guess)
      })
        .then(res => res.json())
        .then(data => {
          //correct guess
          if (gameState.correctGuesses != data.correctGuesses) {
            ui.changeGuessState(e.target, "correct");
            ui.reveal(e.target.id, data);
            updateGameState(data);
            if (data.status === "WIN") {
              ui.gameOver(
                true,
                `Game Over, You Win with ${gameState.currNumGuesses} guesses left!`
              );
            }
          }
          //wrong guess
          else if (gameState.currNumGuesses != data.currNumGuesses) {
            ui.changeGuessState(e.target, "guessed");
            updateGameState(data);
            ui.updateGuessesLeft();
            if (data.status === "LOSS") {
              ui.gameOver(
                false,
                `Game Over, You Lose! Word: ${gameState.word}`
              );
            }
          }
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

let gameState;
const ui = new UI();

// play new game event
ui.playGameEl.addEventListener("click", startNewGame);
function startNewGame(e) {
  //hide new gae button
  ui.playGameEl.style = "display: none";

  //get word
  fetch("http://localhost:8080/games")
    .then(res => res.json())
    .then(data => {
      gameState = data;
      console.log(gameState.word);
      ui.initGame(gameState.word);
    })
    .catch(err => console.log(err));
}

function updateGameState(state) {
  gameState = state;
}
