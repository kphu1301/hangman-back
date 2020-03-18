package com.kphu1301.hangman.game;

public class Guess {
	private Long gameId;
	private String guess;
	
	public Guess(Long gameId, String guess) {
		this.gameId = gameId;
		this.guess = guess;
	}

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	public String getGuess() {
		return guess;
	}

	public void setGuess(String guess) {
		this.guess = guess;
	}
	
	
}
