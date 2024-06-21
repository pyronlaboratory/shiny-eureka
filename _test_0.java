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
