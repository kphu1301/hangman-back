//ui elements
const playBtn = document.querySelector("#play-btn");
const category = document.querySelector("#category");
const bodyParts = document.querySelectorAll(".body-part");
const lettersPlayed = document.querySelector("#letters-played");
const wordContainer = document.querySelector(".word-container");

const words = ["application", "pale", "background", "packers"];
let correctLetters = ["a"];
let word = words[Math.floor(Math.random() * words.length)];

showWord();

function showWord() {
  const wordLetters = word.split("");
  wordLetters.forEach((letter, index) => {
    const div = document.createElement("div");
    div.className = "word-letter";
    div.id = `letter-${index}`;
    const result = correctLetters.includes(letter) ? letter : "";
    div.appendChild(document.createTextNode(`${result}`));

    wordContainer.appendChild(div);
  });
}
