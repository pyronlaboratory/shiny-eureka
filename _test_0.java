package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Defines a configuration class for cross-origin resource sharing (CORS) using Spring
 * WebMvcConfigurer. The class has a single method, `addCorsMappings`, which adds
 * mappings to a registry allowing requests from any origin and specifying allowed
 * methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;

  /**
   * Adds CORS mappings to a registry, allowing requests from any origin and specifying
   * which methods, headers, and credentials are allowed.
   * 
   * @returns a CorsRegistry object containing mappings for cross-origin resource
   * sharing, allowing requests from any origin and specifying allowed methods, headers,
   * and credentials.
   * 
   * * `registry`: This is an instance of `CorsRegistry`, which contains mappings of
   * allowed origins, methods, headers, and credentials for cross-origin resource sharing
   * (CORS).
   * * `allowedOrigins`: A list of allowed origins that are allowed to make requests
   * to the server.
   * * `allowedMethods`: A list of HTTP methods (such as GET, POST, PUT, DELETE, etc.)
   * that are allowed to be used in CORS requests.
   * * `allowedHeaders`: A list of headers that are allowed to be used in CORS requests.
   * * `exposedHeaders`: A list of headers that are exposed to the client in the response.
   * * `allowCredentials`: A boolean value indicating whether credentials (such as
   * cookies, authorization tokens, etc.) are allowed to be included in CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing specified origins to make requests to
       * the server with specific methods and headers, while also exposing two custom headers.
       * 
       * @param registry Cors registry that the `addCorsMappings()` method adds mappings to.
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
