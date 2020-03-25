package com.kphu1301.hangman.word;

public class Word {
	
	private String word;
	private String category;
	
	public Word(String word, String category) {
		this.word = word;
		this.category = category;
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
}
