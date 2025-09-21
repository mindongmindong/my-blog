// components/AuthSection.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {UserProfile} from "@/components/auth/UserProfile";
import LoginModal from "@/components/auth/LoginModal";

export default function AuthSection() {
    const { isLoggedIn, user, isLoading, logout } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleModalClose = () => {
        setIsLoginModalOpen(false);
    };

    // 로딩 중일 때
    if (isLoading) {
        return (
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center space-x-4">
                {isLoggedIn && user ? (
                    <UserProfile user={user} onLogout={logout} />
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        로그인
                    </button>
                )}
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleModalClose}
            />
        </>
    );
}
