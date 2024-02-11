package edu.tum.ase.darkmode.controller;

import java.io.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import edu.tum.ase.darkmode.service.SseService;

@RestController
@RequestMapping("/api/sse/theme")
public class SseController {

    @Autowired
    private SseService sseService;

    @GetMapping("/connect")
    public SseEmitter connectToThemeSse() {
        return sseService.connectToThemeSse();
    }

}