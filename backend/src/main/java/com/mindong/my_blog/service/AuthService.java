package com.mindong.my_blog.service;

import com.mindong.my_blog.domain.RefreshToken;
import com.mindong.my_blog.infrastructure.JwtTokenProvider;
import com.mindong.my_blog.infrastructure.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public Map<String, String> refreshAccessToken(String refreshToken) {
        // 1. RefreshToken 유효성 검증
        if (refreshToken == null || !jwtTokenProvider.validateRefreshToken(refreshToken)) {
            throw new RuntimeException("Invalid Refresh Token");
        }

        // 2. DB에서 RefreshToken 확인
        RefreshToken tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        Long userId = (Long) jwtTokenProvider.getClaimsFromRefreshToken(refreshToken).get("userId");

        // 3. 새 AccessToken + RefreshToken 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(userId);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(userId);

        tokenEntity.refresh(newRefreshToken);

        // 5. 반환 (컨트롤러에서 응답 가공)
        return Map.of(
                "accessToken", newAccessToken,
                "refreshToken", newRefreshToken
        );
    }
}
