package com.onlineide.darkmodeservice.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }

    @Override
    public void configureAsyncSupport(final AsyncSupportConfigurer configurer) {
        // Since Server-Sent Events (SSE) establish a long-lived connection, and if there is no activity (no data sent) for a certain period, 
        // it may result in a timeout exception.
        // So to prevent initiating a new connection everytime set no timeout
        configurer.setDefaultTimeout(0); // Set timeout value in milliseconds (0 means no timeout)
    }
}
