// package com.onlineide.apigateway.config;

// import java.security.Principal;

// import org.springframework.cloud.gateway.filter.GatewayFilterChain;
// import org.springframework.cloud.gateway.filter.GlobalFilter;
// import org.springframework.core.Ordered;
// import org.springframework.stereotype.Component;
// import org.springframework.web.server.ServerWebExchange;
// import reactor.core.publisher.Mono;
// import org.springframework.http.server.reactive.ServerHttpRequest;
// import org.springframework.security.core.context.SecurityContextHolder;

// @Component
// public class CustomGlobalFilter implements GlobalFilter, Ordered {

//     public Principal user() {
// 		return SecurityContextHolder.getContext().getAuthentication();
// 	}

//     @Override
//     public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//         // Obtain user information from the authentication process (e.g., JWT)
//         String userId = user().getName(); // Replace with actual user information

//         // Modify the request to include user information in headers
//         ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
//                 .header("userId", userId)
//                 .build();

//         // Continue the filter chain with the modified request
//         return chain.filter(exchange.mutate().request(modifiedRequest).build());
//     }

//     @Override
//     public int getOrder() {
//         return -1; // Set the order as needed
//     }
// }
