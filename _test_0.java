package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is a configuration class for managing Cross-Origin Resource Sharing (CORS) settings
 * in a Spring Web MVC application. The class allows origins to access specific
 * resources by specifying an array of allowed origins, and enables the use of certain
 * HTTP methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures CORS (Cross-Origin Resource Sharing) settings for a web application,
   * allowing requests from specified origins and methods, as well as specifying which
   * headers to expose and whether credentials should be included in the response.
   * 
   * @returns a configuration for enabling Cross-Origin Resource Sharing (CORS) for all
   * URLs.
   * 
   * * `allowedOrigins`: an array of origin values that are allowed to make requests
   * to the server.
   * * `allowedMethods`: an array of HTTP methods that are allowed for making requests
   * from the allowed origins.
   * * `allowedHeaders`: an array of header names that are allowed to be sent in responses
   * from the server.
   * * `exposedHeaders`: an array of header names that should be exposed in the response.
   * * `allowCredentials`: a boolean value indicating whether credentials (e.g., cookies,
   * Authorization headers) should be included in the responses.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin, method, and
       * headers, as well as enabling credentials.
       * 
       * @param registry CorsRegistry object that contains the mapping configuration for
       * Cross-Origin Resource Sharing (CORS) headers, methods, and origins.
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
