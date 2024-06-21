package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;

  /**
   * Defines CORS (Cross-Origin Resource Sharing) mappings for a Spring Web MVC
   * application, allowing requests from specified origins and methods, as well as
   * specifying which headers to expose and whether credentials should be included in
   * the allowed request types.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to access resources on the server.
   * 
   * * `allowedOrigins`: an array of origins that are allowed to access the resources.
   * * `allowedMethods`: an array of HTTP methods that are allowed to be used by the origins.
   * * `allowedHeaders`: an array of headers that are allowed to be used by the origins.
   * * `exposedHeaders`: an array of headers that are exposed to the origins.
   * * `allowCredentials`: a boolean value indicating whether credentials (e.g.,
   * authentication tokens) should be included in the CORS response.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * which methods, headers, and credentials are allowed.
       * 
       * @param registry Cors registry that is being modified by adding mapping rules to
       * allow cross-origin resource sharing (CORS) requests.
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
