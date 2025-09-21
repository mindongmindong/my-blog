// app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {tokenManager} from "@/lib/tokenManager";

export default function AuthCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const accessToken = searchParams.get('accessToken');

            if (accessToken) {
                tokenManager.setAccessToken(accessToken);
            } else {
                console.error('Access token not found');
            }

            router.push('/');
        };

        handleAuthCallback();
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    );
}
