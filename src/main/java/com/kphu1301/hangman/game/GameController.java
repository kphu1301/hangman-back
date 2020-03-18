package com.kphu1301.hangman.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	@RequestMapping(value="/games", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Game playNewGame() {
		Game game = context.getBean(Game.class);
		return game;
	}
	
	
	@RequestMapping(value="/games/{gameId}", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Game makeGuess(@PathVariable Long gameId, @RequestBody Guess guess) {
		if (gameId != guess.getGameId()) {
			throw new IllegalArgumentException("Invalid Game");
		}
		Game game = context.getBean(Games.class).getGame(gameId);
		game.makeGuess(guess);
		System.out.println("guess detected");
		return game;
	}
	
	@RequestMapping(value="/games/{gameId}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Game getGame(@PathVariable Long gameId) {
		Game game = context.getBean(Games.class).getGame(gameId);
		return game;
	}

}
