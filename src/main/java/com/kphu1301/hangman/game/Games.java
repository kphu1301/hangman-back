package com.kphu1301.hangman.game;

import java.util.HashMap;
import java.util.Map;

public class Games {
	private Map<Long, Game> games;
	
	public Games() {
		games = new HashMap<>();
	}
	
	public Map<Long, Game> getGames(){
		return games;
	}
	
	public Game getGame(long gameId) {
		if (gameId < 1 || gameId > games.size()) {
			throw new IllegalArgumentException("Invalid game");
		}
		
		return games.get(gameId);
	}
	
	public boolean addGame(Game game) {
		if (games.containsKey(game.getId())) {
			return false;
		}
		else {
			games.put(game.getId(), game);
			return true;
		}
	}

}
