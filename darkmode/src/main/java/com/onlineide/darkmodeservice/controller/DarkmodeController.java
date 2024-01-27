package com.onlineide.darkmodeservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.onlineide.darkmodeservice.service.DarkmodeService;


@RestController
@RequestMapping("/dark-mode")
public class DarkmodeController {

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
