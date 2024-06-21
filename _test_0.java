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
   * Adds CORS mappings to a registry, allowing requests from any origin and specifying
   * which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for CORS mappings that allows requests from any origin
   * and specifies which methods, headers, and credentials are allowed.
   * 
   * * `registry`: The Cors registry that is being updated with the specified mapping.
   * * `allowedOrigins`: A list of origins allowed to make requests.
   * * `allowedMethods`: A list of HTTP methods allowed for making requests.
   * * `allowedHeaders`: A list of headers allowed to be accessed in responses.
   * * `exposedHeaders`: A list of headers that are exposed in responses.
   * * `allowCredentials`: Whether credentials (e.g., cookies, authorization headers)
   * are allowed or not.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin, method, and
       * headers, and enabling credentials for authentication.
       * 
       * @param registry CorsRegistry object that is being updated with mapping configuration
       * for cross-origin resource sharing (CORS) policies.
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
