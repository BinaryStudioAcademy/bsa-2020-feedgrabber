package com.feed_grabber.core.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import static com.feed_grabber.core.auth.security.SecurityConstants.*;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return Arrays
                .stream(ROUTES_WHITE_LIST)
                .anyMatch(r -> request.getRequestURI().contains(r));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String header = request.getHeader(AUTH_HEADER_STRING);

        UsernamePasswordAuthenticationToken authentication = getAuthentication(header);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (token == null) {
            return null;
        }

        var tokenString = token.replace(TOKEN_PREFIX, "");
        String user = tokenService.extractUserid(tokenString);

        if (user != null && !tokenService.isTokenExpired(tokenString)) {
            return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
        }

        return null;
    }
}
