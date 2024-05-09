package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
  
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to the registry, allowing incoming requests from any origin,
       * methods, headers, and credentials.
       * 
       * @param registry Cors registry that is being updated with new mapping configurations
       * for handling Cross-Origin Resource Sharing (CORS) requests.
       */
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(allowedOrigins)
            .allowedMethods("*")
            .allowedHeaders("*")
            .exposedHeaders("token", "userId")
            .allowCredentials(true);
      }
    };
  }
}
