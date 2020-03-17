package com.kphu1301.hangman.Word;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WordBank {

	private static WordBank wordBank;
	private Map<String, String> wordList;
	private List<String> categories;
	private String baseUrl = "https://www.enchantedlearning.com";
	
	private WordBank() {
		wordList = new HashMap<>();
		categories = new ArrayList<>();
		parseHtmlForCategoriesAndWords();
	}
	
	public static WordBank getInstance() {
		if (wordBank == null) {
			wordBank = new WordBank();
		}
		return wordBank;
	}
	
	private void parseHtmlForCategoriesAndWords() {
		//word bank
		List<String> wordBank = new ArrayList<>();
		String[] wordInfo = new String[2];
		
		
		String url = baseUrl + "/wordlist/";
		try {
			
			//get page with wordlist
			Document doc = Jsoup.connect(url).get();
			
			//get all categories
			String pattern ="^/wordlist/(.*)shtml$|^/english/";
			Elements categoryLinks = doc.select("font > a[href~=" + pattern + "]");
			
			// get word list for each category
			for (Element categoryLink : categoryLinks) {
				categories.add(categoryLink.text());
				parseHtmlForWordList(categoryLink.attr("href"), categoryLink.text());
			}	
		
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	private void parseHtmlForWordList(String path, String category){
		
		try {
			String url = baseUrl + path;
			Document doc = Jsoup.connect(url).get();
			
			Elements wordLinks = doc.select("div.wordlist-item");

			for (Element wordLink : wordLinks) {
				String word = wordLink.text().replaceAll("[^a-zA-Z]", "").toUpperCase();
				wordList.put(word, category);
			}
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Word getGameWord() {
		List<String> words = new ArrayList(wordList.keySet());
		
		int wordIndex = ThreadLocalRandom.current().nextInt(words.size());
		String word = words.get(wordIndex);
		String category = wordList.get(word);
		Word gameWord = new Word(word, category);
		
		return gameWord;
	}
}
