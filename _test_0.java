package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * Web application. The class provides a method to add CORS mappings to the registry,
 * allowing origins to access specific resources based on allowed Origins, Methods,
 * Headers, and Exposed Headers. The allowCredentials() method is also set to true
 * to enablecredentials authentication.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Defines CORS mappings for a web application, allowing requests from specified
   * origins and methods, as well as providing specific headers and credentials.
   * 
   * @returns a configuration for enabling CORS (Cross-Origin Resource Sharing) on a
   * web application, allowing requests from specified origins and specifying which
   * headers can be accessed.
   * 
   * 	- `allowedOrigins`: an array of allowed origins for CORS requests.
   * 	- `allowedMethods`: an array of allowed HTTP methods for CORS requests.
   * 	- `allowedHeaders`: an array of allowed headers for CORS requests.
   * 	- `exposedHeaders`: an array of exposed headers for CORS requests.
   * 	- `allowCredentials`: a boolean value indicating whether credentials should be
   * included in CORS responses.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin, method, and
       * header, as well as exposing specific headers and enabling credentials.
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
