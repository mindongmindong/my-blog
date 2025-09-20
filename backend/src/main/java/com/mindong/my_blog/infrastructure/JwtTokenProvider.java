package com.mindong.my_blog.infrastructure;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(Long userId) {
        Date now = new Date();

        long accessTokenTime = 1000 * 60 * 30;
        Date expiryDate = new Date(now.getTime() + accessTokenTime);

        return Jwts.builder()
                .claim("userId", userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    // RefreshToken 생성
    public String createRefreshToken(Long userId) {
        Date now = new Date();
        // 7일
        long refreshTokenTime = 1000 * 60 * 60 * 24 * 7;
        Date expiryDate = new Date(now.getTime() + refreshTokenTime);

        return Jwts.builder()
                .claim("userId", userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public boolean validateAccessToken(String token) {
        return validateToken(token, key);
    }

    public boolean validateRefreshToken(String token) {
        return validateToken(token, key);
    }

    public boolean validateToken(String token, Key key) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) { // 토큰 유효 x || 빈 토큰
            return false;
        }
    }

    // AccessToken에서 Claims 가져오기
    public Claims getClaimsFromAccessToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // RefreshToken에서 Claims 가져오기
    public Claims getClaimsFromRefreshToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}