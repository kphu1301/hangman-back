package com.kphu1301.hangman.game;

import com.kphu1301.hangman.Word.Word;

public class Game {
	private static int games = 0;
	private long id;
	private Word gameWord;
	private String word;
	private String category;
	private int numGuesses;
	private int correctGuesses;
	private GameStatus result;
	
	public Game(Word gameWord) {
		id = ++games;
		numGuesses = 6;
		correctGuesses = 0;
		result = GameStatus.INPROGRESS;
		this.gameWord = gameWord;
		this.word = gameWord.getWord();
		this.category = gameWord.getCategory();
		play();
	}
	
	public Word getGameWord() {
		return gameWord;
	}
	
	public void play() {
		System.out.println("Playing Hangman!\nCategory: " + category + "\tWord: " + word);
//		while (result == GameStatus.INPROGRESS) {
//			
//		}
	}
	
}
