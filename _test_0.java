package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * Defines configuration for enabling Cross-Origin Resource Sharing (CORS) in a Spring
 * Web MVC application. The class has a single method, `corsConfigurer()`, which
 * returns a WebMvcConfigurer object that adds CORS mappings to the registry. The
 * CORS mappings allow origins listed in the `allowedOrigins` field to access resources
 * with specific methods and headers. The `addCorsMappings()` method allows credentials
 * to be passed along with the request.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures CORS settings for a web application, allowing requests from any origin
   * and specifying which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for enabling Cross-Origin Resource Sharing (CORS) for all
   * routes.
   * 
   * 	- `allowedOrigins`: An array of allowed origin values.
   * 	- `allowedMethods`: An array of allowed HTTP methods (e.g., GET, POST, PUT, DELETE).
   * 	- `allowedHeaders`: An array of allowed header fields.
   * 	- `exposedHeaders`: An array of header fields that can be exposed to the client.
   * 	- `allowCredentials`: A boolean indicating whether credentials (e.g., authentication
   * tokens) are allowed to be included in the response.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed HTTP methods, headers, and credentials.
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
