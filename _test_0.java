package com.myhome.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * is a Spring configuration class that enables Cross-Origin Resource Sharing (CORS)
 * for a web application. It allows origins specified in the configuration file to
 * access resources from any origin, and specifies allowed methods, headers, and credentials.
 */
@Configuration
public class CorsConfig {
  @Value("${server.cors.allowedOrigins}")
  private String[] allowedOrigins;
  /**
   * configures CORS (Cross-Origin Resource Sharing) settings for the application,
   * allowing requests from specified origins and methods, as well as specifying which
   * headers are exposed to those origins.
   * 
   * @returns a configuration for CORS (Cross-Origin Resource Sharing) that allows
   * requests from any origin to be made to the application.
   * 
   * 	- `registry`: This is an instance of `CorsRegistry`, which is used to store and
   * manage CORS mappings.
   * 	- `addCorsMappings()`: This method adds a mapping for all routes ("/**") to the
   * `CorsRegistry`.
   * 	- `allowedOrigins()`: An array of allowed origins, which specifies the domains
   * that are allowed to make CORS requests.
   * 	- `allowedMethods()`: An array of allowed HTTP methods, which specifies the types
   * of requests that are allowed from allowed origins.
   * 	- `allowedHeaders()`: An array of allowed headers, which specifies the headers
   * that can be used in CORS responses.
   * 	- `exposedHeaders()`: An array of exposed headers, which specifies the headers
   * that can be accessed by the client through the `Access-Control-Expose-Header` header.
   * 	- `allowCredentials()`: A boolean value indicating whether credentials (e.g.,
   * cookies, authorization headers) are allowed to be included in CORS responses.
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      /**
       * adds a CORS (Cross-Origin Resource Sharing) mapping to the registry, allowing
       * requests from any origin and specifying which methods, headers, and credentials
       * are allowed.
       * 
       * @param registry Cors registry to which the addCorsMappings method adds mapping.
       * 
       * 	- `registry`: The `CorsRegistry` object to which mappings are added.
       * 	- `addMapping("/**")`: Adds a mapping to allow cross-origin resource sharing
       * (CORS) for all URLs. The mapping is specified using the star wildcard character
       * `*` to indicate that the mapping applies to all URLs.
       * 	- `allowedOrigins(allowedOrigins)`: Specifies an array of allowed origin domains
       * for the CORS mapping.
       * 	- `allowedMethods("*")`: Specifies an array of allowed HTTP methods (e.g., GET,
       * POST, PUT, DELETE) for the CORS mapping.
       * 	- `allowedHeaders("*")`): Specifies an array of allowed HTTP headers for the CORS
       * mapping.
       * 	- `exposedHeaders("token", "userId")`: Exposes specific HTTP headers that contain
       * sensitive information (e.g., authentication tokens or user IDs).
       * 	- `allowCredentials(true)`: Indicates that the CORS mapping allows credentials
       * (e.g., cookies, authorization headers) to be included in requests.
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
