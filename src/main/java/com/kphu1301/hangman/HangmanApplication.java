package com.kphu1301.hangman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.kphu1301.hangman.config.AppConfig;
import com.kphu1301.hangman.game.Game;

@SpringBootApplication
public class HangmanApplication {

	public static void main(String[] args) {
		SpringApplication.run(HangmanApplication.class, args);
		ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
	}

}
