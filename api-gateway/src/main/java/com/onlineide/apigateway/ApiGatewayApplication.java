package com.onlineide.apigateway;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.csrf.CsrfToken;

import jakarta.servlet.http.HttpServletRequest;


@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:8010", maxAge = 3600)
@EnableZuulProxy
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Hello, this is the home page!";
    }

    @RequestMapping("/user") public Principal user() {
		return SecurityContextHolder.getContext().getAuthentication();
	}

    @GetMapping("/authenticated") 
    public boolean authenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext(); 
        Authentication authentication = securityContext.getAuthentication(); 
        if (authentication != null) {
            return authentication.getAuthorities().stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ANONYMOUS")); 
        }
        return false;
    }
    
    // see https://stackoverflow.com/a/74813159
    @GetMapping("/csrf")
    public void getCsrfToken(HttpServletRequest request) {
        // https://github.com/spring-projects/spring-security/issues/12094#issuecomment-1294150717
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        csrfToken.getToken();
    }

}
