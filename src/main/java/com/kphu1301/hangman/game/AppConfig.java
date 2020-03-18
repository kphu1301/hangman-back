package com.kphu1301.hangman.game;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.kphu1301.hangman.Word.LiquipediaWordBankParser;
import com.kphu1301.hangman.Word.WordBankHtmlParser;

@Configuration
public class AppConfig {

	@Bean
	public WordBankHtmlParser getWordBankParser() {
		return new LiquipediaWordBankParser();
	}
	
	@Bean
	public Games getGames() {
		return new Games();
	}
	
	@Bean
	@Scope("prototype")
	public Game getNewGame(WordBankHtmlParser wordBank, Games games) {
		Game game = new Game(wordBank.getGameWord());
		games.addGame(game);
		return game;
	}
}
