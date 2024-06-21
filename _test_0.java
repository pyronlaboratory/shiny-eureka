package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Configures cross-origin resource sharing (CORS) settings for a web application.
 * The class allows origins specified in the configuration file to access resources
 * with specific methods, headers, and credentials enabled. The allowed origins are
 * defined using a String array.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Adds CORS mappings for all routes in the application, allowing requests from any
   * origin and specifying which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for enabling CORS (Cross-Origin Resource Sharing) on a
   * web application, allowing requests from specified origins and methods.
   * 
   * * `allowedOrigins`: An array of strings representing the origins allowed to access
   * the resource.
   * * `allowedMethods`: An array of strings representing the HTTP methods allowed for
   * the resource.
   * * `allowedHeaders`: An array of strings representing the headers allowed for the
   * resource.
   * * `exposedHeaders`: An array of strings representing the headers that are exposed
   * in the response.
   * * `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * authentication tokens) are allowed to be included in the request.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * which HTTP methods, headers, and credentials are allowed for those requests.
       * 
       * @param registry CorsRegistry object to which the mappings will be added.
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
