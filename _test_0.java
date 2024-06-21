package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * Defines a Spring Boot configuration class that enables Cross-Origin Resource Sharing
 * (CORS) for an application. The class provides a mapping of all URLs to allow
 * origins, methods, headers, and credentials for CORS requests. The allowedOrigins
 * field is set using the @Value annotation from a property file, while the
 * corsConfigurer() method returns a WebMvcConfigurer instance that adds CORS mappings
 * to the registry.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Adds CORS mappings to enable cross-origin resource sharing for all URLs and allows
   * requests from any origin, methods, headers, and credentials.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to access resources from the application.
   * 
   * * `allowedOrigins`: An array of origins that are allowed to make requests to the
   * server.
   * * `allowedMethods`: An array of HTTP methods that are allowed to be used in requests
   * from allowed origins.
   * * `allowedHeaders`: An array of headers that are allowed to be used in responses
   * from the server.
   * * `exposedHeaders`: An array of headers that can be exposed in responses to
   * client-side applications.
   * * `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * authentication tokens) can be included in requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {
      
      /**
       * Adds CORS mappings to a registry, specifying allowed origins, methods, headers,
       * and credentials for all resources.
       * 
       * @param registry Cors registry that can be modified with new mappings for cross-origin
       * resource sharing (CORS) settings.
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
