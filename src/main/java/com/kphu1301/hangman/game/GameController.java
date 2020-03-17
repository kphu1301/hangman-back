package com.kphu1301.hangman.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kphu1301.hangman.Word.Word;

@Controller
public class GameController {
	
	private ApplicationContext context;
	
	@Autowired
	public GameController(ApplicationContext context) {
		this.context = context;
	}
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String showHome() {
		return "index.html";
	}
	
	@RequestMapping(value="/game", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Word playNewGame() {
		Game game = context.getBean(Game.class);

		return game.getGameWord();
	}

}
