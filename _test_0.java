package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * Is a configuration class that enables Cross-Origin Resource Sharing (CORS) for a
 * Spring Web MVC application. It defines an array of allowed origins and allows all
 * methods, headers, and credentials by default.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  /**
   * Configures CORS (Cross-Origin Resource Sharing) settings for a web application by
   * adding mapping, allowing origins, methods, headers, and credentials.
   * 
   * @returns a configuration that allows cross-origin resource sharing for all methods,
   * headers, and origins.
   * 
   * * `allowedOrigins`: The list of allowed origins for CORS requests.
   * * `allowedMethods`: The list of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: The list of allowed headers for CORS requests.
   * * `exposedHeaders`: The list of exposed headers for CORS requests.
   * * `allowCredentials`: Whether credentials (e.g., cookies, Authorization header)
   * are allowed in CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry Cors registry that is being modified to add new mappings.
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
