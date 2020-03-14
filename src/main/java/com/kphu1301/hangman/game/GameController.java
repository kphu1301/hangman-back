package com.kphu1301.hangman.game;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GameController {
	
	@RequestMapping("/")
	public String showHome() {
		return "index.html";
	}

}
