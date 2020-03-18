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
      <h2 id="category">Category: ${gameState.category}</h2>
      <h4 id="guesses-remaining">Guesses Left: ${gameState.currNumGuesses}</h4>
    `;

    gameDiv.appendChild(categoryDiv);

    let html = "";
    for (let i = 0; i < word.length; i++) {
      let str = "";
      if (word[i] !== " ") {
        str = "__&nbsp";
      } else {
        str = "&nbsp&nbsp&nbsp";
      }
      html += `
        <h1 class="word-letter d-inline" id="letter-${i}">${str}</h1>
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

  updateGuessesLeft() {
    document.querySelector("#guesses-remaining").textContent = `
      Guesses Left: ${gameState.currNumGuesses}
    `;
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

    setTimeout(() => {
      div.remove();
      document.querySelector(".game-container").remove();
      this.togglePlayGame("show");
    }, 5000);
  }
  reveal(letter, data) {
    const letterDivs = document.querySelectorAll(`.word-letter`);
    for (let i = 0; i < gameState.revealedLetters.length; i++) {
      if (data.revealedLetters[i] !== null) {
        if (gameState.revealedLetters[i] === null) {
          letterDivs[i].innerHTML = `
              <u>${letter}</ul>
          `;
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
            console.log(
              `correctGuesses: ${gameState.correctGuesses}  guessesToWin: ${gameState.guessesToWin}`
            );
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
      console.log(gameState);
      ui.initGame(gameState.word);
    })
    .catch(err => console.log(err));
}

function updateGameState(state) {
  gameState = state;
}
