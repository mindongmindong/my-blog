// lib/tokenManager.ts
'use client';

class TokenManager {
    private accessToken: string | null = null;
    private refreshPromise: Promise<string> | null = null;

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    clearAccessToken() {
        this.accessToken = null;
    }

    async refreshAccessToken(): Promise<string> {

        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this.performTokenRefresh();

        try {
            return await this.refreshPromise;
        } finally {
            this.refreshPromise = null;
        }
    }

    private async performTokenRefresh(): Promise<string> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // 쿠키 포함
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Refresh Token이 만료되었거나 유효하지 않음
                    this.clearAccessToken();
                    throw new Error('Refresh token expired');
                }
                throw new Error('Token refresh failed');
            }

            const { accessToken } = await response.json();
            this.setAccessToken(accessToken);
            return accessToken;
        } catch (error) {
            this.clearAccessToken();
            throw error;
        }
    }

    isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch {
            return true;
        }
    }

    isTokenExpiringSoon(token: string, thresholdMinutes: number = 1): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            const threshold = thresholdMinutes * 60;
            return payload.exp < (currentTime + threshold);
        } catch {
            return true;
        }
    }
}

export const tokenManager = new TokenManager();
