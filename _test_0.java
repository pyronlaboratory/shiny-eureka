package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * MVC application. It allows origins specified in the configuration to access resources
 * via a mapping of "/**". The class sets allowedOrigins, allowedMethods, allowedHeaders,
 * exposedHeaders, and allowCredentials to enable secure communication.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  /**
   * Adds CORS mappings to a registry, allowing requests from any origin, method, and
   * header, and exposing certain headers for authentication.
   * 
   * @returns a configuration object that adds CORS mappings to allow requests from any
   * origin, method, and header, while exposing certain headers for authentication.
   * 
   * * `registry`: This is an instance of `CorsRegistry`, which contains the mapping
   * configuration for the API.
   * * `allowedOrigins`: A list of origins that are allowed to make requests to the API.
   * * `allowedMethods`: A list of HTTP methods that are allowed to be used in requests
   * to the API.
   * * `allowedHeaders`: A list of headers that are allowed to be included in requests
   * to the API.
   * * `exposedHeaders`: A list of headers that are exposed for authentication purposes.
   * * `allowCredentials`: A boolean value indicating whether credentials (e.g., bearer
   * tokens) are allowed in requests to the API.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry Cors registry that is being updated with the mapping configuration.
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
