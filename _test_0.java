package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is configured to enable Cross-Origin Resource Sharing (CORS) for a Spring Web MVC
 * application. It sets allowed origins, methods, headers, and credentials for the
 * CORS mappings.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
    
  /**
   * Configures CORS settings for a web application, allowing incoming requests from
   * any origin and specifying which methods and headers are allowed, as well as enabling
   * credentials for authenticated requests.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requested resources to be shared between different origins.
   * 
   * * `allowedOrigins`: An array of allowed origins for CORS requests.
   * * `allowedMethods`: An array of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: An array of allowed headers for CORS requests.
   * * `exposedHeaders`: An array of exposed headers for CORS requests.
   * * `allowCredentials`: A boolean indicating whether credentials (e.g., cookies,
   * authorization tokens) should be allowed for CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed HTTP methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that the method adds mappings to.
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
