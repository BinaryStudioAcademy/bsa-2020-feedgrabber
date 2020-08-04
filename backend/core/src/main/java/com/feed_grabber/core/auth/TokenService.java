package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.model.AuthUser;
import io.jsonwebtoken.Claims;
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

import static com.feed_grabber.core.security.SecurityConstants.RENOVATION_TOKEN_EXPIRATION_TIME;
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

    public String generateToken(AuthUser userDetails) {
        return generateToken(userDetails.getId(), TOKEN_EXPIRATION_TIME);
    }

    public String generateRenovationToken(AuthUser userDetails) {
        return generateToken(userDetails.getId(), RENOVATION_TOKEN_EXPIRATION_TIME);
    }

    public String renovateToken(String renovationToken) throws Exception {
        if (renovationToken != null && !isTokenExpired(renovationToken)){
            var userId = UUID.fromString(extractUserid(renovationToken));
            return generateToken(userId, TOKEN_EXPIRATION_TIME);
        }
        throw new Exception();
    }

    private String generateToken(UUID subject, long expiration) {
        Map<String, Object> claims = new HashMap<>();
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }


}
