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
   * Adds CORS mapping rules to a registry, allowing requests from any origin and
   * specifying which methods, headers, and credentials are allowed.
   * 
   * @returns a configuration for cross-origin resource sharing (CORS) that allows
   * requests from any origin and specifies allowed methods, headers, and credentials.
   * 
   * * `registry`: The Cors registry that is being modified by adding mapping rules to
   * allow cross-origin resource sharing (CORS) requests.
   * * `allowedOrigins`: A list of allowed origins for CORS requests.
   * * `allowedMethods`: A list of allowed HTTP methods for CORS requests.
   * * `allowedHeaders`: A list of allowed headers for CORS requests.
   * * `exposedHeaders`: A list of exposed headers for CORS requests.
   * * `allowCredentials`: Whether credentials (e.g., cookies, authorization headers)
   * are allowed for CORS requests.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {

      
      /**
       * Adds CORS mappings to a registry, allowing requests from any origin and specifying
       * which methods, headers, and credentials are allowed.
       * 
       * @param registry Cors registry that is being updated with the specified mapping.
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
