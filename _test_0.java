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
   * Defines CORS mappings for a web application, allowing requests from any origin and
   * specifying which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to access resources on the server.
   * 
   * * `allowedOrigins`: an array of allowed origins for CORS requests.
   * * `allowedMethods`: an array of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: an array of allowed HTTP headers for CORS requests.
   * * `exposedHeaders`: an array of exposed HTTP headers for CORS requests.
   * * `allowCredentials`: a boolean value indicating whether credentials (e.g.,
   * authentication tokens) are allowed in CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS (Cross-Origin Resource Sharing) mappings to a registry, allowing specific
       * origins, methods, headers, and credentials for a given resource.
       * 
       * @param registry Cors registry that is being modified by adding mapping rules for
       * cross-origin resource sharing (CORS).
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
