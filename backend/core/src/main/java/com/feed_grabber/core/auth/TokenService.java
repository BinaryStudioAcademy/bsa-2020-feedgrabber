package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.exceptions.JwtTokenExpiredException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import static com.feed_grabber.core.security.SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME;
import static com.feed_grabber.core.security.SecurityConstants.TOKEN_EXPIRATION_TIME;

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

    public String generateAccessToken(UUID id) {
        return generateToken(id, TOKEN_EXPIRATION_TIME);
    }

    public String generateRefreshToken(UUID id) {
        return generateToken(id, REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public TokenRefreshResponseDTO refreshTokens(String refreshToken) throws Exception {
        try {
            if (refreshToken != null && !isTokenExpired(refreshToken)) {
                var userId = UUID.fromString(extractUserid(refreshToken));
                String jwt = generateToken(userId, TOKEN_EXPIRATION_TIME);
                String refreshJwt = generateToken(userId, REFRESH_TOKEN_EXPIRATION_TIME);
                return new TokenRefreshResponseDTO(jwt, refreshJwt);
            }
            throw new IllegalArgumentException("No token passed");
        } catch (ExpiredJwtException e) {
            throw new JwtTokenExpiredException();
        }
    }

    private String generateToken(UUID subject, long expiration) {
        Map<String, Object> claims = new HashMap<>();
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.builder()
                .setClaims(claims)
                .setHeader(headers)
                .setSubject(subject.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }


}
