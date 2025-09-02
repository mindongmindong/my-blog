// frontend/src/data/posts.ts

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // 상세 페이지용
  category: string;
  date: string;
  readTime: string;
  author: string;
  tags?: string[];
}

export const dummyPosts: Post[] = [
  {
    id: 1,
    title: "Next.js 13 App Router 완벽 가이드",
    excerpt: "Next.js 13에서 새롭게 도입된 App Router의 핵심 개념과 사용법을 자세히 알아봅시다. 기존 Pages Router와의 차이점과 마이그레이션 방법까지 다룹니다.",
    content: "Next.js 13에서 도입된 App Router는...", // 나중에 상세 내용 추가
    category: "frontend",
    date: "2025-01-15",
    readTime: "5분",
    author: "Developer",
    tags: ["Next.js", "React", "App Router", "Frontend"]
  },
  {
    id: 2,
    title: "Spring Boot 3.0 주요 변경사항과 업그레이드 가이드",
    excerpt: "Spring Boot 3.0에서 달라진 점들과 마이그레이션 가이드를 정리했습니다. Java 17, Spring 6.0, 그리고 새로운 기능들을 살펴봅시다.",
    content: "Spring Boot 3.0의 주요 변경사항...",
    category: "backend",
    date: "2025-01-10",
    readTime: "8분",
    author: "Developer",
    tags: ["Spring Boot", "Java", "Backend", "Migration"]
  },
  {
    id: 3,
    title: "효율적인 알고리즘 문제 해결 전략",
    excerpt: "코딩테스트와 알고리즘 문제를 효율적으로 해결하는 방법론을 소개합니다. 시간 복잡도 분석부터 실전 팁까지 모든 것을 다룹니다.",
    content: "알고리즘 문제를 효율적으로 해결하기 위해서는...",
    category: "algorithm",
    date: "2025-01-05",
    readTime: "12분",
    author: "Developer",
    tags: ["Algorithm", "Problem Solving", "Coding Test", "Data Structure"]
  },
  {
    id: 4,
    title: "운영체제 기초: 프로세스와 스레드의 이해",
    excerpt: "프로세스와 스레드의 개념, 차이점, 그리고 동기화 메커니즘에 대해 자세히 알아봅시다. CS 면접에서 자주 나오는 핵심 내용입니다.",
    content: "운영체제에서 프로세스와 스레드는...",
    category: "cs",
    date: "2025-01-03",
    readTime: "10분",
    author: "Developer",
    tags: ["Operating System", "Process", "Thread", "CS"]
  },
  {
    id: 5,
    title: "React 18의 새로운 기능들",
    excerpt: "React 18에서 도입된 Concurrent Features, Automatic Batching, Suspense 개선사항 등을 실습과 함께 알아봅시다.",
    content: "React 18에서 새롭게 도입된 기능들...",
    category: "frontend",
    date: "2025-01-01",
    readTime: "7분",
    author: "Developer",
    tags: ["React", "React 18", "Concurrent Features", "Frontend"]
  },
  {
    id: 6,
    title: "데이터베이스 인덱스 최적화 기법",
    excerpt: "데이터베이스 성능 향상을 위한 인덱스 설계와 최적화 방법을 실무 경험을 바탕으로 설명합니다.",
    content: "데이터베이스 성능 최적화에서 인덱스는...",
    category: "backend",
    date: "2024-12-28",
    readTime: "15분",
    author: "Developer",
    tags: ["Database", "Index", "Performance", "SQL"]
  }
];

// 카테고리별 게시글 수 계산 함수
export const getCategoryCount = (category: string): number => {
  if (category === 'all') return dummyPosts.length;
  return dummyPosts.filter(post => post.category === category).length;
};

// 카테고리별 게시글 필터링 함수
export const getPostsByCategory = (category: string): Post[] => {
  if (category === 'all') return dummyPosts;
  return dummyPosts.filter(post => post.category === category);
};

// ID로 특정 게시글 조회 함수
export const getPostById = (id: number): Post | undefined => {
  return dummyPosts.find(post => post.id === id);
};

// 최신 게시글 N개 조회 함수
export const getRecentPosts = (count: number = 3): Post[] => {
  return dummyPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};
