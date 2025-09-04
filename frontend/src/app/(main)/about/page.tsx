// frontend/src/app/about/page.tsx

import Link from 'next/link';
import { getCategoryCount } from '@/data/posts';

export default function AboutPage() {
  const totalPosts = getCategoryCount('all');

  const techStack = [
    { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Spring Boot', 'Java', 'Node.js', 'PostgreSQL'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel'] },
    { category: 'Tools', items: ['WebStorm', 'Git', 'Figma', 'Notion'] }
  ];

  const achievements = [
    { title: '블로그 게시글', count: totalPosts, unit: '개' },
    { title: '학습 시간', count: 500, unit: '시간+' },
    { title: '프로젝트 경험', count: 10, unit: '개+' },
    { title: '개발 경력', count: 2, unit: '년+' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 헤로 섹션 */}
      <section className="text-center py-12">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">Dev</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          안녕하세요, 민동현입니다! 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          끊임없이 학습하며 성장하는 개발자로,
          기술을 통해 문제를 해결하고 가치를 창출하는 것을 좋아합니다.
        </p>
      </section>

      {/* 소개 섹션 */}
      <section className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            안녕하세요! 저는 <strong>풀스택 개발자</strong>로서 프론트엔드부터 백엔드, 그리고 인프라까지
            다양한 영역에서 경험을 쌓아가고 있습니다. 특히 <strong>사용자 경험</strong>과
            <strong>코드 품질</strong>에 관심이 많으며, 항상 더 나은 해결책을 찾기 위해 노력합니다.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            이 블로그는 제가 학습하고 경험한 내용들을 기록하고 공유하는 공간입니다.
            알고리즘 문제 해결부터 최신 웹 기술 트렌드까지, 개발과 관련된 다양한 주제들을 다루고 있습니다.
            혹시 궁금한 점이나 함께 이야기하고 싶은 주제가 있다면 언제든 연락해 주세요!
          </p>

          <p className="text-gray-700 leading-relaxed">
            현재는 <strong>Next.js</strong>와 <strong>Spring Boot</strong>를 주로 사용하여 웹 애플리케이션을 개발하고 있으며,
            최근에는 클라우드 인프라와 DevOps 영역에도 관심을 갖고 학습 중입니다.
          </p>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {achievement.count}{achievement.unit}
              </div>
              <div className="text-gray-600 font-medium">
                {achievement.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {techStack.map((stack, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TechIcon category={stack.category} />
                <span className="ml-3">{stack.category}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 블로그 소개 섹션 */}
      <section className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">이 블로그에 대해</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">목적</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                학습한 내용을 정리하고 기록
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                다른 개발자들과 지식 공유
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                문제 해결 과정과 경험 공유
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                개발 커뮤니티에 기여
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">주요 주제</h3>
            <div className="space-y-3">
              <Link href="/posts?category=algorithm" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">알고리즘</div>
                  <div className="text-sm text-gray-600">문제 해결과 자료구조</div>
                </div>
              </Link>

              <Link href="/posts?category=cs" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">CS</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">컴퓨터 과학</div>
                  <div className="text-sm text-gray-600">기초 이론과 개념</div>
                </div>
              </Link>

              <Link href="/posts?category=frontend" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">FE</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">프론트엔드</div>
                  <div className="text-sm text-gray-600">React, Next.js 등</div>
                </div>
              </Link>

              <Link href="/posts?category=backend" className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">BE</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">백엔드</div>
                  <div className="text-sm text-gray-600">Spring Boot, 데이터베이스</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Let&#39;s Connect!</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          새로운 기술, 프로젝트 협업, 또는 단순히 개발 이야기를 나누고 싶다면 언제든 연락해 주세요.
          함께 성장하는 개발자 커뮤니티를 만들어갔으면 좋겠습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>

          <a
            href="mailto:your-email@example.com"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>

          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            블로그 둘러보기
          </Link>
        </div>
      </section>
    </div>
  );
}

// 기술 스택 아이콘 컴포넌트
function TechIcon({ category }: { category: string }) {
  const iconClasses = "w-6 h-6";

  switch (category) {
    case 'Frontend':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Backend':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'DevOps':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'Tools':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

// 메타데이터
export const metadata = {
  title: 'About | Dev Blog',
  description: '개발자 소개와 블로그에 대한 정보를 확인해보세요.',
};
