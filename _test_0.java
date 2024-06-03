package com.myhome.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * Web application. The class allows origins to access resources by specifying allowed
 * origins, methods, headers, and credentials. The addCorsMappings method adds the
 * CORS mapping to the registry, allowing all origins to access all resources with
 * allowed methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  
  /**
   * Configures CORS (Cross-Origin Resource Sharing) settings for a web application.
   * It adds mappings to allow cross-origin requests from specified origins, methods,
   * headers, and credentials.
   * 
   * @returns a set of CORS mappings that allow requests from specified origins and
   * methods, and expose specific headers.
   * 
   * 	- `allowedOrigins`: an array of URLs that are allowed to make requests to the server.
   * 	- `allowedMethods`: an array of HTTP methods (such as GET, POST, PUT, DELETE)
   * that are allowed to be used in CORS requests.
   * 	- `allowedHeaders`: an array of headers that are allowed to be included in CORS
   * responses.
   * 	- `exposedHeaders`: an array of headers that are exposed in CORS responses.
   * 	- `allowCredentials`: a boolean indicating whether credentials (such as cookies,
   * authorization tokens) should be included in CORS responses.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds CORS mappings to a registry, allowing specified origins, methods, headers,
       * and credentials for a given resource.
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
