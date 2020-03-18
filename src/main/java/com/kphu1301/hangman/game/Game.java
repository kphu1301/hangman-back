package com.kphu1301.hangman.game;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import com.kphu1301.hangman.Word.Word;

public class Game {
	private static long numGames = 0;
	private long id;
	private String word;
	private Character[] revealedLetters;
	private String category;
	private Set<Character> guessedLetters;
	private int currNumGuesses;
	private int correctGuesses;
	private int guessesToWin;
	private GameStatus status;
	
	public Game(Word gameWord) {
		id = ++numGames;
		currNumGuesses = 6;
		correctGuesses = 0;
		status = GameStatus.INPROGRESS;
		word = gameWord.getWord();
		category = gameWord.getCategory();
		guessesToWin = word.trim().length();
		guessedLetters = new HashSet<>();
		revealedLetters = new Character[word.length()];
		for (int i = 0; i < revealedLetters.length; i++) {
			if (word.charAt(i) == ' ') {
				revealedLetters[i] = ' ';
				guessesToWin--;
			}
		}
	}

	public Character[] getRevealedLetters() {
		return revealedLetters;
	}

	public void setRevealedLetters(Character[] revealedLetters) {
		this.revealedLetters = revealedLetters;
	}

	public Set<Character> getGuessedLetters() {
		return guessedLetters;
	}

	public void setGuessedLetters(Set<Character> guessedLetters) {
		this.guessedLetters = guessedLetters;
	}

	public void makeGuess(Guess guess) {
		if (status == GameStatus.INPROGRESS && !guessedLetters.contains(guess.getGuess().charAt(0))) {
			boolean guessed = false;
			for (int i = 0; i < word.length(); i++) {
				if (guess.getGuess().equals(word.substring(i, i + 1))){
					revealedLetters[i] = word.charAt(i);
					guessed = true;
					correctGuesses++;
				}
			}
			if (!guessed) {
				currNumGuesses--;
			}
			guessedLetters.add(guess.getGuess().charAt(0));
			updateStatus();
		}
			
	}
	
	private void updateStatus() {
		if (currNumGuesses == 0) {
			status = GameStatus.LOSS;
		}
		else if (correctGuesses == guessesToWin) {
			status = GameStatus.WIN;
		}
		else {
			status = GameStatus.INPROGRESS;
		}
	}
	
	
	public static long getNumGames() {
		return numGames;
	}

	public static void setNumGames(long numGames) {
		Game.numGames = numGames;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getCurrNumGuesses() {
		return currNumGuesses;
	}

	public void setCurrNumGuesses(int currNumGuesses) {
		this.currNumGuesses = currNumGuesses;
	}

	public int getCorrectGuesses() {
		return correctGuesses;
	}

	public void setCorrectGuesses(int correctGuesses) {
		this.correctGuesses = correctGuesses;
	}

	public int getGuessesToWin() {
		return guessesToWin;
	}

	public void setGuessesToWin(int guessesToWin) {
		this.guessesToWin = guessesToWin;
	}

	public GameStatus getStatus() {
		return status;
	}

	public void setStatus(GameStatus status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Game [id=" + id + ", word=" + word + ", revealedLetters=" + Arrays.toString(revealedLetters)
				+ ", category=" + category + ", currNumGuesses=" + currNumGuesses + ", correctGuesses=" + correctGuesses
				+ ", guessesToWin=" + guessesToWin + ", status=" + status + "]";
	}
	
}
