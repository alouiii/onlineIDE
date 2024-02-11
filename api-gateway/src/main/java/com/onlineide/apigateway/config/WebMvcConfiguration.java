package com.onlineide.apigateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;


@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Value("${cors.origins}")
    private String corsOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = corsOrigins.split(",");
        registry.addMapping("/**")
                .allowedHeaders("*", "x-csrf-token") // Allow 'x-csrf-token' header
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }

    @Bean
    public FilterRegistrationBean<CorsHeaderFilter> corsHeaderFilter() {
        FilterRegistrationBean<CorsHeaderFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CorsHeaderFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    public class CorsHeaderFilter implements Filter {

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            httpServletResponse.setHeader("Access-Control-Allow-Origin", null);
            chain.doFilter(request, response);
        }
    }
}
