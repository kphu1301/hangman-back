package com.kphu1301.hangman.game;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Game {
	private static int games = 0;
	private long id;
	private String word;
	private String category;
	private int numGuesses;
	private int correctGuesses;
	private GameStatus result;
	
	public Game() {
		id = ++games;
		numGuesses = 6;
		correctGuesses = 0;
		result = GameStatus.INPROGRESS;
		getRandomWord();
		play();
	}
	
	public void play() {
		System.out.println("Category: " + category + "\tWord: " + word);
		while (result == GameStatus.INPROGRESS) {
			
		}
	}
	
	private String[] parseHtmlForWordAndCategory() {
		//word bank
		List<String> wordBank = new ArrayList<>();
		String[] wordInfo = new String[2];
		
		String baseUrl = "https://www.enchantedlearning.com";
		String url = baseUrl + "/wordlist/";
		try {
			
			//get page with wordlist
			Document doc = Jsoup.connect(url).get();
			
			//get list of all a tags
			Elements links = doc.getElementsByTag("a");
			
			//list of all categories;
			List<String> categoryHrefs = new ArrayList<>();
			
			//filter a tags for category lists
			for (Element link : links) {
				String linkHref = link.attr("href");

				//visit each category and cache words
				if (linkHref.contains("/wordlist/") && linkHref.contains(".shtml")) {
					String tempCategory = StringUtils.substringBetween(linkHref, "/wordlist/", ".shtml");
					if (tempCategory != null) {
						categoryHrefs.add(linkHref);
					}
				}
			}
			
			int categoryIndex = ThreadLocalRandom.current().nextInt(categoryHrefs.size());
			String categoryHref = categoryHrefs.get(categoryIndex);
			String category = StringUtils.substringBetween(categoryHref, "/wordlist/", ".shtml");
			parseHtmlForWords(baseUrl + categoryHref, wordBank);
			
			int wordIndex = ThreadLocalRandom.current().nextInt(wordBank.size());
		
			
			wordInfo[0] = category;
			wordInfo[1] = wordBank.get(wordIndex);
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return wordInfo;
	}
	
	private void parseHtmlForWords(String url, List<String> wordBank) {
		
		try {
			Document doc = Jsoup.connect(url).get();
			Elements wordListElements = doc.getElementsByClass("wordlist-item");
			for (Element e : wordListElements) {
				wordBank.add(e.text());
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void getRandomWord() {
		String[] wordInfo = parseHtmlForWordAndCategory();
		category = wordInfo[0];
		word = wordInfo[1];
	}
}
