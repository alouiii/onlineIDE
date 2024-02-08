package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.dto.UserResponse;
import com.onlineide.projectservice.repository.UserRepository;
import com.onlineide.projectservice.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletResponse;
import java.net.URISyntaxException;
import java.security.Principal;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserDataController {

    private final OAuthService oAuthService;
    private final UserRepository userRepository;

    @Autowired
    public UserDataController(OAuthService oAuthService, UserRepository userRepository) {
        this.oAuthService = oAuthService;
        this.userRepository = userRepository;

    }
    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(Principal principal) {
        ResponseEntity<UserResponse> userNotFound = userRepository.findByUsername(principal.getName())
                .map(user -> ResponseEntity.ok(new UserResponse()))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserResponse())); // Return an empty UserResponse
        return userNotFound;
    }



    @PostMapping("/exchange-code")
    public Mono<ResponseEntity<String>> exchangeCodeForToken(@RequestBody String code) throws URISyntaxException {
        return oAuthService.exchangeCodeForToken(code)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.status(INTERNAL_SERVER_ERROR).body(e.getMessage())));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, (jakarta.servlet.http.HttpServletResponse) response, auth);
        }
        String authToken = request.getHeader("Authorization");

        if (authToken != null && authToken.startsWith("Bearer ")) {
            String token = authToken.substring(7);
            oAuthService.invalidateToken(token);
        }

        return ResponseEntity.ok().build();
    }

}
