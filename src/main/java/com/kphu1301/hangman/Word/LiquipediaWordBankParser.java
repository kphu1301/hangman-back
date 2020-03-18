package com.kphu1301.hangman.Word;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class LiquipediaWordBankParser extends WordBankHtmlParser {
	
	public LiquipediaWordBankParser() {
		baseUrl = "https://liquipedia.net";
		wordList = new HashMap<>();
		categories = new ArrayList<>();
		parseHtmlForCategoriesAndWords();
	}

	@Override
	protected void parseHtmlForCategoriesAndWords() {
		categories.add("Dota 2 - Heroes");
		categories.add("Dota 2 - Items");

		String path = "/dota2/Portal:Heroes";
		try {
			Document doc = Jsoup.connect(baseUrl + path).get();
			
			Elements spans = doc.select("li > span > a");
			
			for (Element span : spans) {
				wordList.put(span.text().toUpperCase(), categories.get(0));
			}
			
			System.out.println("Heroes: " + wordList.size());
			
			
			path = "/dota2/Portal:Items";
			doc = Jsoup.connect(baseUrl + path).get();
			
			Elements divs = doc.select("div.responsive > a > a");
			for (Element div : divs) {
				wordList.put(div.attr("title").toUpperCase(), categories.get(1));
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
