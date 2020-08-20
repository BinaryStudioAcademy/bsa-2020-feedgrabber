package com.feed_grabber.core.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

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

        var header = request.getHeader(AUTH_HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        var auth = getAuthentication(header);

        SecurityContextHolder.getContext().setAuthentication(auth);

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (token == null) {
            return null;
        }
        var tokenString = token.replace(TOKEN_PREFIX, "");

        var user = tokenService.extractUserid(tokenString);
        var authority = new SimpleGrantedAuthority(tokenService.extractRoleName(tokenString));
        var details = new HashMap<String, Object>();

        details.put(COMPANY_ID_KEY, tokenService.extractCompanyId(tokenString).toString());
        details.put(AUTHORITIES_KEY, tokenService.extractRoleName(tokenString));

        if (user != null && !tokenService.isTokenExpired(tokenString)) {
            return new UsernamePasswordAuthenticationToken(user, details, List.of(authority));
        }

        return null;
    }
}
