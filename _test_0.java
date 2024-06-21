package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Allows for the configuration of cross-origin resource sharing (CORS) rules for a
 * Spring MVC application. The class provides a method to add mapping rules to a Cors
 * registry, allowing specific origins, methods, headers, and credentials for a given
 * resource. The class also provides a Bean annotation for creating a WebMvcConfigurer
 * object that can be used to add CORS mapping rules to the registry.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Adds CORS mappings to allow requests from any origin, specifying allowed methods,
   * headers, and credentials.
   * 
   * @returns a mapping to the CORS registry, allowing requests from any origin with
   * specific allowed methods, headers, and credentials.
   * 
   * * `registry`: The Cors registry to which the mappings are being added.
   * * `allowedOrigins`: An array of allowed origins for CORS requests.
   * * `allowedMethods`: A string of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: A string of allowed headers for CORS requests.
   * * `exposedHeaders`: An array of exposed headers for CORS requests.
   * * `allowCredentials`: A boolean value indicating whether credentials (e.g., cookies,
   * authorizations) are allowed for CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that contains the mappings for cross-origin
       * resource sharing (CORS) policies.
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
