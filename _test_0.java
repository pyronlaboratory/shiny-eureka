package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is configured to enable Cross-Origin Resource Sharing (CORS) for the server. The
 * class provides an array of allowed origins and allows all methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
 
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures CORS settings for a web application, allowing incoming requests from
   * specified origins, methods, and headers, while also exposing certain headers and
   * enabling credentials.
   * 
   * @returns a configuration for enabling CORS (Cross-Origin Resource Sharing) on a
   * web application, allowing requests from specified origins and methods, as well as
   * including specific headers and credentials.
   * 
   * 	- `allowedOrigins`: An array of origins allowed to access the server's resources.
   * 	- `allowedMethods`: An array of HTTP methods allowed to be used by the origins
   * listed in `allowedOrigins`.
   * 	- `allowedHeaders`: An array of request headers allowed to be used by the origins
   * listed in `allowedOrigins`.
   * 	- `exposedHeaders`: An array of response headers that are exposed to origins
   * listed in `allowedOrigins`.
   * 	- `allowCredentials`: Whether credentials (e.g., authentication bearer tokens)
   * should be allowed for the origins listed in `allowedOrigins`.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin, method, and
       * header, and exposing certain headers with credentials enabled.
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
