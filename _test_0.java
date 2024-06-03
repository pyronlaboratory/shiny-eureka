package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * MVC web application. The class provides a way to define allowed origins, methods,
 * headers, and credentials for CORS mapping. The @Bean annotation is used to create
 * an instance of WebMvcConfigurer, which adds CORS mappings to the registry.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures Cross-Origin Resource Sharing (CORS) settings for a web application,
   * allowing requests from specified origins and methods, and exposing specific headers.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * access to resources from any origin, with specific allowed methods and headers.
   * 
   * 	- `allowedOrigins`: An array of origins that are allowed to make requests to the
   * server.
   * 	- `allowedMethods`: An array of HTTP methods that are allowed to be used in
   * requests from allowed origins.
   * 	- `allowedHeaders`: An array of header fields that are allowed to be used in
   * responses from the server.
   * 	- `exposedHeaders`: An array of header fields that are exposed to clients in responses.
   * 	- `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * cookies, authorization headers) should be included in requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds mapping to the CORS registry, allowing requests from any origin and including
       * specific headers and methods. It also sets allow credentials to true.
       * 
       * @param registry CorsRegistry object where methods are added to configure CORS
       * settings for the application.
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
