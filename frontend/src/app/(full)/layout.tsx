export default function FullScreenLayout({ children }: { children: React.ReactNode }) {
  return (
    // 이 레이아웃은 자식에게 스타일을 강제하지 않습니다.
    // 페이지 컴포넌트가 전체 화면을 자유롭게 사용할 수 있습니다.
    <div className="w-full min-h-screen bg-gray-100">
      {children}
    </div>
  );
}