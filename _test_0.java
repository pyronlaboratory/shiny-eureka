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
   * Adds CORS mappings to a registry, allowing incoming requests from any origin and
   * specifying allowed HTTP methods, headers, and credentials.
   * 
   * @returns a mapping configuration for CORS that allows incoming requests from any
   * origin and specifies allowed HTTP methods, headers, and credentials.
   * 
   * * `registry`: The Cors registry that is being updated with the mapping configuration.
   * * `allowedOrigins`: An array of allowed origins for incoming requests.
   * * `allowedMethods`: An array of allowed HTTP methods for incoming requests.
   * * `allowedHeaders`: An array of allowed headers for incoming requests.
   * * `exposedHeaders`: An array of headers that can be exposed in responses.
   * * `allowCredentials`: A boolean indicating whether credentials (e.g., authentication
   * tokens) are allowed or not.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
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
