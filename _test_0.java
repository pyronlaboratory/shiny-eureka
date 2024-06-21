package com.myhome.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configures Cross-Origin Resource Sharing (CORS) for a Spring MVC web application.
 * It defines an array of allowed origins and allows all methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures CORS settings for the web application by mapping all URLs to allow
   * incoming requests from any origin, methods, headers, and credentials.
   * 
   * @returns a configuration for enabling CORS (Cross-Origin Resource Sharing) on a
   * web application, allowing requests from specified origins and methods.
   * 
   * * `allowedOrigins`: an array of allowed origins for CORS requests.
   * * `allowedMethods`: an array of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: an array of allowed HTTP headers for CORS requests.
   * * `exposedHeaders`: an array of exposed HTTP headers for CORS requests.
   * * `allowCredentials`: a boolean indicating whether credentials (e.g., cookies,
   * authorization) are allowed for CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that is used to map HTTP methods to allowed
       * origins, methods, headers, and credentials for handling Cross-Origin Resource
       * Sharing (CORS) requests.
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
