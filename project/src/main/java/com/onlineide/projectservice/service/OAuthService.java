package com.onlineide.projectservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlineide.projectservice.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;


@Service
public class OAuthService {

    private final WebClient webClient;
    private TokenStore tokenStore;


    @Autowired
    public OAuthService(WebClient.Builder webClientBuilder, TokenStore tokenStore) {
        this.webClient = webClientBuilder.build();
        this.tokenStore = tokenStore; // Ensure you are injecting TokenStore properly
    }
    public Mono<UserResponse> getUserDetails(String accessToken) throws URISyntaxException {
        String userDetailsUri = "https://gitlab.lrz.de/api/v4/user";

        return webClient.get()
                .uri(new URI(userDetailsUri))
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class) // Get the raw JSON as a String
                .doOnNext(json -> System.out.println("User details JSON: " + json)) // Log the raw JSON
                .map(json -> {
                    // Deserialize JSON to UserResponse manually
                    try {
                        return new ObjectMapper().readValue(json, UserResponse.class);
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse user details", e);
                    }
                })
                .onErrorMap(e -> new RuntimeException("Failed to fetch user details", e));
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

    public void invalidateToken(String token) {
        OAuth2AccessToken accessToken = (OAuth2AccessToken) tokenStore.readAccessToken(token);
        if (accessToken != null) {
            tokenStore.removeAccessToken((org.springframework.security.oauth2.common.OAuth2AccessToken) accessToken);
        }
    }
}
