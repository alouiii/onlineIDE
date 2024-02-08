package com.onlineide.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();
        delegate.setCsrfRequestAttributeName("_csrf");
        CsrfTokenRequestHandler requestHandler = delegate::handle;
        return http.
                authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/**").authenticated();
                    auth.requestMatchers("/user").authenticated();

                    auth.anyRequest().permitAll();
                })
                .oauth2Login(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults())
                .csrf(csrf -> {
                    csrf.csrfTokenRepository(csrfTokenRepository());
                    csrf.csrfTokenRequestHandler(requestHandler);
                })
                .logout((logout) ->
                    logout.deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/")
                )
                .build();
    }

    // @Bean
    // SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     // See https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html#_i_am_using_angularjs_or_another_javascript_framework
    //     XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();
    //     delegate.setCsrfRequestAttributeName("_csrf");
    //     CsrfTokenRequestHandler requestHandler = delegate::handle;

    //     return http.
    //             authorizeHttpRequests(auth -> {
    //                 auth.anyRequest().permitAll();
    //             })
    //             .csrf(csrf -> {
    //                 csrf.csrfTokenRepository(csrfTokenRepository());
    //                 csrf.csrfTokenRequestHandler(requestHandler);
    //             })
    //             .build();
    // }

    @Bean
    public CsrfTokenRepository csrfTokenRepository() {
        CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        repository.setCookiePath("/");
        return repository;
    }
}
