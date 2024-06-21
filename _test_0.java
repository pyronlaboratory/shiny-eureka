package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is a configuration class that sets up CORS mappings for cross-origin resource
 * sharing. It allows requests from any origin and specifies which methods, headers,
 * and credentials are allowed. The class also enables credentials for authentication.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;

  /**
   * Adds CORS mappings to a registry, allowing requests from any origin, method, and
   * headers, and enabling credentials for authentication.
   * 
   * @returns a set of CORS mappings that allow requests from any origin, method, and
   * headers, and enable credentials for authentication.
   * 
   * * `allowedOrigins`: The list of origins that are allowed to make requests to the
   * application.
   * * `allowedMethods`: The list of HTTP methods that are allowed to be used in requests
   * from originated sources.
   * * `allowedHeaders`: The list of headers that are allowed to be used in requests
   * from originated sources.
   * * `exposedHeaders`: The list of headers that are exposed in responses to clients.
   * * `allowCredentials`: Whether credentials (e.g., cookies, authorization headers)
   * are allowed for authentication purposes.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * which methods, headers, and credentials are allowed.
       * 
       * @param registry Cors registry that is being updated with the mapping configurations.
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
