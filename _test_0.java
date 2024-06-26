package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Defines a configuration class for cross-origin resource sharing (CORS) using Spring
 * WebMvcConfigurer. The class adds mappings to a registry allowing requests from any
 * origin and specifying allowed methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;

  /**
   * Adds CORS mappings to a registry, allowing specified origins to make requests to
   * the server with specific methods and headers, while also exposing two custom headers.
   * 
   * @returns a configuration for CORS mapping that allows requests from specified
   * origins with specific methods and headers, while also exposing two custom headers.
   * 
   * * The function returns an instance of `WebMvcConfigurer`, which is a subclass of
   * `AbstractConfigurer`.
   * * The function adds CORS mappings to a registry using the `addCorsMappings()` method.
   * * The mappings allow requests from any origin, with any HTTP method and header,
   * while exposing two custom headers ("token" and "userId").
   * * The `allowedCredentials` parameter is set to `true`, indicating that credentials
   * (e.g., cookies, authorization headers) are allowed for CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
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
