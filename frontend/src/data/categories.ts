// frontend/src/data/categories.ts

export interface Category {
  value: string;
  label: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  {
    value: 'algorithm',
    label: 'Algorithm',
    description: '자료구조와 알고리즘, 문제 해결 방법론',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    value: 'cs',
    label: 'CS',
    description: '컴퓨터 과학 기초 지식과 이론',
    color: 'bg-green-100 text-green-800'
  },
  {
    value: 'frontend',
    label: 'Frontend',
    description: '프론트엔드 개발 기술과 경험',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    value: 'backend',
    label: 'Backend',
    description: '백엔드 개발과 서버 사이드 기술',
    color: 'bg-orange-100 text-orange-800'
  }
];

export const getCategoryByValue = (value: string): Category | undefined => {
  return categories.find(category => category.value === value);
};

export const getCategoryColor = (category: string): string => {
  const found = getCategoryByValue(category);
  return found?.color || 'bg-gray-100 text-gray-800';
};
