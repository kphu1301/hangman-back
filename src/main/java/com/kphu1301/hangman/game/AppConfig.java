package com.kphu1301.hangman.game;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.kphu1301.hangman.Word.WordBank;

@Configuration
public class AppConfig {

	@Bean
	public WordBank getWordBank() {
		return WordBank.getInstance();
	}
	
	@Bean
	@Scope("prototype")
	public Game getNewGame() {
		WordBank wordBank = getWordBank();
		return new Game(wordBank.getGameWord());
	}
}
