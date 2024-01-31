package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.service.OAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;

import java.net.URISyntaxException;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserDataController {

    @Autowired
    private OAuthService oAuthService;

    @GetMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @PostMapping("/exchange-code")
    public Mono<ResponseEntity<String>> exchangeCodeForToken(@RequestBody String code) {
        try {
            return oAuthService.exchangeCodeForToken(code)
                    .map(jwt -> ResponseEntity.ok(jwt))
                    .onErrorResume(e -> Mono
                            .just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage())));
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

}
