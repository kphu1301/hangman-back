package com.kphu1301.hangman.word;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class EnchantedLearningWordBankParser extends WordBankHtmlParser {
	
	public EnchantedLearningWordBankParser() {
		baseUrl = "http://www.enchantedlearning.com";
		wordList = new HashMap<>();
		categories = new ArrayList<>();
		parseHtmlForCategoriesAndWords();
	}
	
	@Override
	protected void parseHtmlForCategoriesAndWords() {
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
				//remove word if more than 2 words
				String word = wordLink.text().replaceAll("[^a-zA-Z\\s]", "").toUpperCase();
				int spaces = 0;
				for (int i = 0; i < word.length(); i++) {
					if (word.charAt(i) == ' ') {
						spaces++;
					}
				}
				if (spaces <= 1) {
					wordList.put(word, category);
				}
			}
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
