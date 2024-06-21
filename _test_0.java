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
   * Adds CORS mapping rules to a registry, allowing specific origins, methods, headers,
   * and credentials for a given resource.
   * 
   * @returns a CorsRegistry object with mapping rules for cross-origin resource sharing.
   * 
   * * `registry`: The Cors registry that is being modified by adding mapping rules for
   * cross-origin resource sharing (CORS).
   * * `allowedOrigins`: A list of origins that are allowed to access the resources.
   * * `allowedMethods`: A list of HTTP methods that are allowed to be used when accessing
   * the resources.
   * * `allowedHeaders`: A list of headers that are allowed to be used when accessing
   * the resources.
   * * `exposedHeaders`: A list of headers that are exposed to the client.
   * * `allowCredentials`: Whether credentials (e.g., cookies, authorization headers)
   * are allowed or not.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {

  
    return new WebMvcConfigurer() {
      /**
       * Adds mapping to CORS registry, allowing requests from any origin and specifying
       * allowed methods, headers, and credentials.
       * 
       * @param registry Cors registry to which the mappings are being added.
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
