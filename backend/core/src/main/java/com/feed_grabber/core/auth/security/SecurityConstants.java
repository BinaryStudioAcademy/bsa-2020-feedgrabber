package com.feed_grabber.core.auth.security;

public class SecurityConstants {
    public static final long TOKEN_EXPIRATION_TIME = 3_600_000; // 1 hour
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 86_400_000; // 1 day
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTH_HEADER_STRING = "Authorization";
    public static final String[] ROUTES_WHITE_LIST = {
            "/api/auth/login",
            "/api/user/email/reset",
            "/api/user/reset",
            "/api/auth/register",
            "/api/auth/invitation",
            "/api/auth/register/confirm",
            "/api/auth/renovate",
            "/api/invitations/sign-up/**",
            "/api/company/user-companies",
            "/v2/api-docs",
            "/configuration/ui",
            "/ws/**",
            "/swagger-resources/**",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/webjars",
            "/swagger-resources"
    };
    public static final String AUTHORITIES_KEY = "role";
    public static final String COMPANY_ID_KEY = "companyId";
}
