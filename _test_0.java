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
   * @returns a Cors registry with mapping configurations allowing requests from any
   * origin and specifying allowed methods, headers, and credentials.
   * 
   * * `registry`: The Cors registry that is being updated with the mapping configurations.
   * * `allowedOrigins`: A list of allowed origins for which the mappings apply.
   * * `allowedMethods`: A list of allowed HTTP methods (e.g., GET, POST, PUT, DELETE)
   * for which the mappings apply.
   * * `allowedHeaders`: A list of allowed headers for which the mappings apply.
   * * `exposedHeaders`: A list of exposed headers that are included in the response.
   * * `allowCredentials`: A boolean value indicating whether credentials (e.g.,
   * authentication tokens) should be allowed or not.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * which methods, headers, and credentials are allowed.
       * 
       * @param registry CorsRegistry object that contains mappings of allowed origins,
       * methods, headers, and credentials for cross-origin resource sharing (CORS) in the
       * specified function.
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
