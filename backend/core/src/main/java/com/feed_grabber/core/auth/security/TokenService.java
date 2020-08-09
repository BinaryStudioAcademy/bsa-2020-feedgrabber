package com.feed_grabber.core.auth.security;

import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import static com.feed_grabber.core.auth.security.SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME;
import static com.feed_grabber.core.auth.security.SecurityConstants.TOKEN_EXPIRATION_TIME;

@Service
public class TokenService {
    @Value(value = "${auth0.secret-key}")
    private String SECRET_KEY;

    public String extractUserid(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateAccessToken(UUID id, Map<String, Object> claims) {
        return generateToken(id, claims, TOKEN_EXPIRATION_TIME);
    }

    public String generateRefreshToken(UUID id, Map<String, Object> claims) {
        return generateToken(id, claims, REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public TokenRefreshResponseDTO refreshTokens(String refreshToken) {
        try {
            if (refreshToken != null && !isTokenExpired(refreshToken)) {
                var userId = UUID.fromString(extractUserid(refreshToken));
                var companyId = UUID
                        .fromString(extractClaim(refreshToken, claims -> (String) claims.get("companyId")));
                String jwt = generateToken(userId, Map.of("companyId", companyId), TOKEN_EXPIRATION_TIME);
                String refreshJwt = generateToken(userId, Map.of("companyId", companyId), REFRESH_TOKEN_EXPIRATION_TIME);
                return new TokenRefreshResponseDTO(jwt, refreshJwt);
            }
            throw new JwtTokenException("No token passed");
        } catch (ExpiredJwtException e) {
            throw new JwtTokenException("Token expired");
        }
    }

    private String generateToken(UUID subject, Map<String, Object> claims, long expiration) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.builder()
                .setSubject(subject.toString())
                .addClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    public static UUID getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var currentUserId = (String) auth.getPrincipal();
        return UUID.fromString(currentUserId);
    }

}