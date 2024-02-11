package edu.tum.ase.darkmode.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import edu.tum.ase.darkmode.service.DarkmodeService;
import edu.tum.ase.darkmode.service.SseService;

import java.io.*;

@RestController
@RequestMapping("/api/dark-mode")
public class DarkmodeController {

	@Autowired
    private SseService sseService;

	@GetMapping("/connect")
    public SseEmitter connectToThemeSse() {
        return sseService.connectToThemeSse();
    }
	
    @Autowired
    private DarkmodeService darkmodeService;

    @RequestMapping(path = "/toggle", method = RequestMethod.GET)
	public void toggleDarkMode() {
		darkmodeService.toggleDarkMode();
	}

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public boolean getDarkModeStatus(){
		return darkmodeService.getDarkModeStatus();
	}

}
