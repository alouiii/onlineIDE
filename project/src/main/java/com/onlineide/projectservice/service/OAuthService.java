package com.onlineide.projectservice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@Service
public class OAuthService {

    private final WebClient webClient;

    public OAuthService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> exchangeCodeForToken(String code) throws URISyntaxException {
        String tokenUri = "https://gitlab.lrz.de/oauth/token";

        String clientId = "3c320a9378bae7dd876289b05524903b5936ca7b5600d67a9021a409eeda2a36";
        String clientSecret = "gloas-186ddd1cb93d0729f6a3e24843675ace5de758541c3bf766f06c4531d62945c6";

        Map<String, String> map = new HashMap<>();
        map.put("client_id", clientId);
        map.put("client_secret", clientSecret);
        map.put("code", code);
        map.put("grant_type", "authorization_code");
        map.put("redirect_uri", "http://localhost:4200/projects");

        return webClient.post()
                .uri(new URI(tokenUri))
                .bodyValue(map)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("access_token"))
                .onErrorMap(e -> new RuntimeException("Failed to exchange token", e));
    }
}
