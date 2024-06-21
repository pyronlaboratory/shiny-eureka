package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
 * Configures Cross-Origin Resource Sharing (CORS) settings for a Spring MVC application.
 * It allows origins specified in the configuration to access resources via a mapping
 * of "/**". The class sets allowedOrigins, allowedMethods, allowedHeaders, exposedHeaders,
 * and allowCredentials to enable secure communication.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  /**
   * Configures CORS (Cross-Origin Resource Sharing) settings for a web application.
   * It adds mapping to allow cross-origin resource sharing from any origin, allows all
   * methods and headers, and specifies allowed origins, methods, and headers.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to access resources from the server.
   * 
   * * `allowedOrigins`: an array of origins that are allowed to make requests to the
   * server.
   * * `allowedMethods`: an array of methods that are allowed to be called on the server.
   * * `allowedHeaders`: an array of headers that are allowed to be used in responses.
   * * `exposedHeaders`: an array of headers that are exposed to clients in their responses.
   * * `allowCredentials`: a boolean value indicating whether credentials (e.g., cookies,
   * authorization headers) should be allowed in requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin, method, and
       * header, and exposing certain headers for authentication.
       * 
       * @param registry CorsRegistry object that contains the mapping configuration for
       * the API.
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
