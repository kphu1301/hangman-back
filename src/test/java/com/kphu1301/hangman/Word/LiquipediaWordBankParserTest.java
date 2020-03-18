package com.kphu1301.hangman.Word;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import org.junit.jupiter.api.Test;

class LiquipediaWordBankParserTest {

	WordBankHtmlParser wordBankParser = new LiquipediaWordBankParser();
	
	@Test
	void testParseHtmlForCategoriesAndWords() {	
		Map<String, String> wordListBefore = wordBankParser.wordList;
		wordBankParser.parseHtmlForCategoriesAndWords();
		Map<String, String> wordListAfter = wordBankParser.wordList;
		assertEquals(true, wordListBefore.equals(wordListAfter));
	}

}
