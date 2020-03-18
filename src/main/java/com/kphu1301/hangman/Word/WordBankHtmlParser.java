package com.kphu1301.hangman.Word;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public abstract class WordBankHtmlParser {
	protected WordBankHtmlParser wordBank;
	protected Map<String, String> wordList;
	protected List<String> categories;
	protected String baseUrl;
	
	
	protected abstract void parseHtmlForCategoriesAndWords();
	
	public Word getGameWord() {
		List<String> words = new ArrayList(wordList.keySet());
		
		int wordIndex = ThreadLocalRandom.current().nextInt(words.size());
		String word = words.get(wordIndex);
		String category = wordList.get(word);
		Word gameWord = new Word(word, category);
		
		return gameWord;
	}
	
}
