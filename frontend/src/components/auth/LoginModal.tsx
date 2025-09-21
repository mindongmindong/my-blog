'use client';

import { useState, useEffect } from 'react';
import {OAuthProvider, oauthProviders} from "@/data/OAuthProvider";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            // 모달이 열릴 때 body 스크롤 방지
            document.body.style.overflow = 'hidden';
        } else {
            // 모달이 닫힐 때 body 스크롤 복원
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleProviderLogin = (provider: OAuthProvider) => {
        // OAuth 리다이렉트
        window.location.href = provider.authUrl;
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 150); // 애니메이션 지속 시간 후 모달 닫기
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
        >
            {/* 백드롭 */}
            <div className="absolute inset-0 bg-gray-300 bg-opacity-15"></div>

            {/* 모달 콘텐츠 */}
            <div
                className={`relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-150 ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
            >
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">로그인</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="모달 닫기"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* 모달 바디 */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-6 text-center">
                        소셜 계정으로 간편하게 로그인하세요
                    </p>

                    {/* OAuth Provider 버튼들 */}
                    <div className="space-y-3">
                        {oauthProviders.map((provider) => (
                            <button
                                key={provider.id}
                                onClick={() => handleProviderLogin(provider)}
                                className={`w-full flex items-center justify-center px-4 py-3 border-1 rounded-lg font-medium text-gray-600`}
                            >
                                <span className="mr-3">{provider.icon}</span>
                                {provider.name}로 계속하기
                            </button>
                        ))}
                    </div>
                </div>

                {/* 모달 푸터 */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                    <p className="text-xs text-gray-500 text-center">
                        로그인하면 <a href="#" className="text-blue-600 hover:underline">이용약관</a> 및{' '}
                        <a href="#" className="text-blue-600 hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
