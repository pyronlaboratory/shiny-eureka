package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Is used to configure CORS settings for a Spring Web MVC application. The class
 * contains a @Value annotation to retrieve a value from a properties file, and a
 * @Bean annotation to create a new instance of a WebMvcConfigurer interface. The
 * interface provides methods for adding CORS mappings to the registry, allowing
 * origins, methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
    /**
     * Configures CORS settings for a web application, allowing cross-origin resource
     * sharing from specified origins and methods, and exposing specific headers.
     * 
     * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
     * cross-origin requests from specified origins and methods, and exposes specific headers.
     * 
     * * `allowedOrigins`: An array of allowed origins for CORS requests.
     * * `allowedMethods`: An array of allowed HTTP methods for CORS requests.
     * * `allowedHeaders`: An array of allowed headers for CORS requests.
     * * `exposedHeaders`: An array of exposed headers for CORS requests.
     * * `allowCredentials`: A boolean value indicating whether credentials (e.g., cookies,
     * authorization headers) are allowed or not in CORS responses.
     */
    @Bean
  public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {

      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry CorsRegistry object that contains the mapping configuration for
       * handling Cross-Origin Resource Sharing (CORS) requests.
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
