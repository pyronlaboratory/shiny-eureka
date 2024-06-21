package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**

 * Is used to configure Cross-Origin Resource Sharing (CORS) settings for a Spring
 * MVC application. The class sets allowedOrigins, allowedMethods, allowedHeaders,
 * exposedHeaders, and allowCredentials to enable secure communication. The
 * WebMvcConfigurer method adds CORS mappings to a registry, allowing requests from
 * any origin and specifying allowed methods, headers, and credentials.

 * Defines a Spring Boot configuration class that enables cross-origin resource sharing
 * (CORS) for an application by providing mappings for all URLs, origins, methods,
 * headers, and credentials. The class uses the @Value annotation to set the
 * allowedOrigins field and provides a mapping of all URLs to allow origins, methods,
 * headers, and credentials for CORS requests through the corsConfigurer() method.

 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;

  /**
   * Adds CORS mappings to a registry, allowing requests from any origin and specifying
   * allowed methods, headers, and credentials.
   * 
   * @returns a WebMvcConfigurer instance that adds CORS mappings to a registry.
   * 
   * * The output is a `WebMvcConfigurer` instance, which is used to configure CORS
   * settings for the application.
   * * The function adds CORS mappings to a registry, allowing requests from any origin
   * and specifying allowed methods, headers, and credentials.
   * * The `allowedOrigins` property specifies the list of allowed origins for CORS requests.
   * * The `allowedMethods` property specifies the list of allowed HTTP methods for
   * CORS requests.
   * * The `allowedHeaders` property specifies the list of allowed HTTP headers for
   * CORS requests.
   * * The `exposedHeaders` property specifies the list of headers that can be exposed
   * in CORS responses.
   * * The `allowCredentials` property indicates whether credentials (such as cookies,
   * Authorization header) are allowed for CORS requests.

  
  /**
   * Adds CORS mappings to a registry, allowing cross-origin resource sharing for all
   * resources by specifying allowed origins, methods, headers, and credentials.
   * 
   * @returns a configuration for cross-origin resource sharing (CORS) settings, allowing
   * requests from specified origins and methods, and including specific headers and credentials.
   * 
   * * `registry`: The Cors registry that can be modified with new mappings for
   * cross-origin resource sharing (CORS) settings.
   * * `allowedOrigins`: The list of allowed origins for accessing resources.
   * * `allowedMethods`: The list of allowed HTTP methods for accessing resources.
   * * `allowedHeaders`: The list of allowed headers for accessing resources.
   * * `exposedHeaders`: The list of headers that are exposed to the client.
   * * `allowCredentials`: Whether credentials (e.g., cookies, authorization headers)
   * should be allowed or not.

   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {

      /**
       * Adds a mapping to the CORS registry, allowing requests from any origin and specifying
       * allowed HTTP methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that is being modified by adding mappings to
       * its registry.

      
      /**
       * Adds a mapping to the CORS registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry Cors registry that is being updated with the mapping configurations.

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
