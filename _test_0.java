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
  
  /**
   * Configures CORS (Cross-Origin Resource Sharing) settings for a web application,
   * allowing requests from specified origins, methods, and headers to be processed.
   * 
   * @returns a configuration object for CORS (Cross-Origin Resource Sharing) mapping.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds a CORS mapping to the registry with an empty path matcher, allowing any
       * origins, methods, and headers, and also allows credentials.
       * 
       * @param registry Cors registry that the method adds mappings to.
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
