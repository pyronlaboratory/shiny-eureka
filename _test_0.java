package com.myhome.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is annotated with Spring's @Configuration annotation and defines a WebMvcConfigurer
 * bean that configures Cross-Origin Resource Sharing (CORS) for the server. The class
 * has two main components: the allowedOrigins field, which is annotated with `@Value`,
 * and the corsConfigurer() method, which is annotated with `@Bean`. The addCorsMappings()
 * method within the corsConfigurer() method allows CORS configurations for all routes
 * ("/**") by specifying allowed origins, methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Defines CORS mappings for a web application, allowing requests from any origin and
   * specifying which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to access resources on the server.
   * 
   * 	- `allowedOrigins`: An array of origins that are allowed to make requests to the
   * server.
   * 	- `allowedMethods`: An array of HTTP methods that are allowed to be used in
   * requests from the allowed origins.
   * 	- `allowedHeaders`: An array of header fields that are allowed to be used in
   * requests from the allowed origins.
   * 	- `exposedHeaders`: An array of header fields that are exposed in responses from
   * the server to the allowed origins.
   * 	- `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * authentication information) should be included in requests from the allowed origins.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing all origins and methods, as well as
       * specific headers and credentials.
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
