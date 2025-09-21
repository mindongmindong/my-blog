// hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import apiClient from "@/lib/apiClient";
import {tokenManager} from "@/lib/tokenManager";

export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isLoggedIn: false,
        user: null,
        isLoading: true,
    });

    // 초기 인증 상태 확인
    const initializeAuth = async () => {
        try {

            // Refresh Token으로 Access Token 획득 시도
            const accessToken = await tokenManager.refreshAccessToken();

            // 사용자 정보 가져오기
            const response = await apiClient.get('/api/v1/users/me');
            const user = response.data;

            setAuthState({
                isLoggedIn: true,
                user,
                isLoading: false,
            });
        } catch (error) {
            console.log('Authentication initialization failed:', error);
            setAuthState({
                isLoggedIn: false,
                user: null,
                isLoading: false,
            });
        }
    };

    // 로그아웃
    const logout = async () => {
        try {
            // 직접 백엔드 서버에 로그아웃 요청
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
                method: 'DELETE',
                credentials: 'include', // HttpOnly 쿠키 포함
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenManager.getAccessToken()}`,
                },
            });
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            tokenManager.clearAccessToken();
            setAuthState({
                isLoggedIn: false,
                user: null,
                isLoading: false,
            });
        }
    };

    // Access Token으로 사용자 정보 업데이트
    const refreshUserInfo = async () => {
        try {
            const response = await apiClient.get('/api/v1/users/me');
            const user = response.data;

            setAuthState(prev => ({
                ...prev,
                user,
            }));
        } catch (error) {
            console.error('Failed to refresh user info:', error);
        }
    };

    // 컴포넌트 마운트 시 초기화
    useEffect(() => {
        initializeAuth();
    }, []);

    return {
        ...authState,
        logout,
        refreshUserInfo,
        refreshAuth: initializeAuth,
    };
};
