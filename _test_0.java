package com.myhome.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * Web application. The class provides a way to specify allowed origins, methods,
 * headers, and credentials for CORS requests. The @Bean method returns a WebMvcConfigurer
 * implementation that adds CORS mappings to the registry.
 */
@Configuration
public class CorsConfig {
 
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Adds CORS mappings to enable cross-origin resource sharing for all routes and
   * allows requests from specified origins, methods, headers, credentials, and user data.
   * 
   * @returns a set of CORS mappings that allow requests from any origin and include
   * specific headers for token and userId.
   * 
   * 	- `allowedOrigins`: An array of origins that are allowed to make requests to the
   * API.
   * 	- `allowedMethods`: An array of HTTP methods that are allowed to be used in
   * requests from the allowed origins.
   * 	- `allowedHeaders`: An array of headers that are allowed to be used in responses
   * from the API.
   * 	- `exposedHeaders`: An array of headers that are exposed in responses from the API.
   * 	- `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * authentication information) can be included in requests from the allowed origins.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that is being updated with new Cors mappings.
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
