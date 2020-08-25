package com.feed_grabber.core.auth.security;

import com.feed_grabber.core.auth.dto.TokenValuesDto;
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

import static com.feed_grabber.core.auth.security.SecurityConstants.*;

@Service
public class TokenService {
    @Value("${auth0.secret-key}")
    private String SECRET_KEY;

    public String extractUserid(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public UUID extractCompanyId(String token) {
        var body = getAllClaimsFromToken(token)
                .get(COMPANY_ID_KEY, String.class);
        return UUID.fromString(body);
    }

    public String extractRoleName(String token) {
        return getAllClaimsFromToken(token)
                .get(AUTHORITIES_KEY, String.class);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        var claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateAccessToken(TokenValuesDto user) {
        return generateToken(user, TOKEN_EXPIRATION_TIME);
    }

    public String generateRefreshToken(TokenValuesDto user) {
        return generateToken(user, REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public TokenRefreshResponseDTO refreshTokens(String refreshToken) {
        try {
            if (refreshToken != null && !isTokenExpired(refreshToken)) {
                var userId = UUID.fromString(extractUserid(refreshToken));
                var companyId = extractCompanyId(refreshToken);
                var role = extractRoleName(refreshToken);
                var tokenDto = new TokenValuesDto(userId, companyId, role);

                String jwt = generateToken(tokenDto, TOKEN_EXPIRATION_TIME);
                String refreshJwt = generateToken(tokenDto, REFRESH_TOKEN_EXPIRATION_TIME);
                return new TokenRefreshResponseDTO(jwt, refreshJwt);
            }
            throw new JwtTokenException("No token passed");
        } catch (ExpiredJwtException e) {
            throw new JwtTokenException("Token expired");
        }
    }

    private String generateToken(TokenValuesDto dto, long expiration) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        var claims = Jwts.claims().setSubject(dto.getUserId().toString());
        claims.put(COMPANY_ID_KEY, dto.getCompanyId().toString());
        claims.put(AUTHORITIES_KEY, dto.getRole());
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    public static UUID getUserId() {
        var currentUserId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return UUID.fromString(currentUserId);
    }

    public static UUID getCompanyId() {
        var info = (Map)SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return UUID.fromString((String)info.get(COMPANY_ID_KEY));
    }

    public static String getRoleName() {
        var info = (Map)SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return (String)info.get(AUTHORITIES_KEY);
    }

}
