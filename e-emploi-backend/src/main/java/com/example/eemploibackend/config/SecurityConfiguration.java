package com.example.eemploibackend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/ws/**","/ws/info")
                .permitAll()
                .requestMatchers("/auth/**")
                .permitAll()
                .requestMatchers("/category/**")
                .permitAll()
                .requestMatchers("/api/randompro")
                .permitAll()
                .requestMatchers("/api/randompro/**")
                .permitAll()
                .requestMatchers("/api/users/**")
                .permitAll()
                .requestMatchers("/api/user/checkEmailAvailability","/api/user/checkUsernameAvailability")
                .permitAll()
                .requestMatchers(HttpMethod.GET,"/api/users/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                .logoutUrl("/auth/logout")
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                .addLogoutHandler(logoutHandler)
                );
        return http.build();
    }
}
