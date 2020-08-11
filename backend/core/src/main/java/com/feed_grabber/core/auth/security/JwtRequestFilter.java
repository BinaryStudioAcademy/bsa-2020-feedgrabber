package com.feed_grabber.core.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
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
import java.util.*;
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

        var authentication = getAuthentication(header);

        var sec = SecurityContextHolder.getContext();
        sec.setAuthentication(authentication);

        AbstractAuthenticationToken auth = (AbstractAuthenticationToken)sec.getAuthentication();
        HashMap<String, Object> info = new HashMap<String, Object>();
        var companyId = getCompanyId(header);
        info.put(COMPANY_ID_KEY, companyId.toString());
        auth.setDetails(info);

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (token == null) {
            return null;
        }

        var tokenString = token.replace(TOKEN_PREFIX, "");
        String user = tokenService.extractUserid(tokenString);

        var authority = new SimpleGrantedAuthority(tokenService.extractRoleName(tokenString));
        var authorities = List.of(authority);

        if (user != null && !tokenService.isTokenExpired(tokenString)) {
            return new UsernamePasswordAuthenticationToken(user, null, authorities);
        }

        return null;
    }

    private UUID getCompanyId(String token) {
        if (token == null) {
            return null;
        }

        var tokenString = token.replace(TOKEN_PREFIX, "");
        UUID companyId = tokenService.extractCompanyId(tokenString);

        if (!tokenService.isTokenExpired(tokenString)) {
            return companyId;
        }

        return null;
    }
}
