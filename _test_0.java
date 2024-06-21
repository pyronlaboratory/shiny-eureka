package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * Web MVC application. The class provides a mapping of allowed origins, methods,
 * headers, and credentials for the application.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures Cross-Origin Resource Sharing (CORS) settings for a web application.
   * It adds mappings to allow incoming requests from specified origins, methods,
   * headers, and credentials.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to be made to the server.
   * 
   * * `allowedOrigins`: an array of origins that are allowed to make requests to the
   * application.
   * * `allowedMethods`: an array of HTTP methods that are allowed for making requests
   * from authorized origins.
   * * `allowedHeaders`: an array of headers that are allowed for making requests from
   * authorized origins.
   * * `exposedHeaders`: an array of headers that are exposed in responses to authorized
   * origins.
   * * `allowCredentials`: a boolean indicating whether credentials (e.g., authentication
   * tokens) should be included in allowed requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing incoming requests from any origin and
       * specifying allowed HTTP methods, headers, and credentials.
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
