package com.myhome.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Defines configuration for Cross-Origin Resource Sharing (CORS) in a Spring Web MVC
 * application. It sets up mappings for allowing origins to access specific resources,
 * methods, headers, and credentials. The configuration is applied using the
 * `addCorsMappings()` method of the `CorsRegistry` interface.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Defines CORS mappings for a web application, allowing requests from specified
   * origins and methods, and exposing certain headers.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to be made to the server.
   * 
   * 	- `allowedOrigins`: an array of URLs that are allowed to make requests to the
   * application's endpoints.
   * 	- `allowedMethods`: an array of HTTP methods (e.g., GET, POST, DELETE) that are
   * allowed to be used by requesters from allowed origins.
   * 	- `allowedHeaders`: an array of headers that are allowed to be used in requests
   * from allowed origins.
   * 	- `exposedHeaders`: an array of headers that the application wants to expose to
   * requesters.
   * 	- `allowCredentials`: a boolean indicating whether request credentials (e.g.,
   * authentication tokens) should be included in the CORS response.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and including
       * specific headers and methods.
       * 
       * @param registry Cors registry that is being updated with the mapping configuration.
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
