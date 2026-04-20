export function Footer() {
  return (
    <footer className="bg-[#1f2833] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg mb-4">
              개인회생 전문센터
            </h3>
            <p className="text-sm leading-relaxed">
              15년 경력의 전문가가<br />
              개인회생 성공까지 책임집니다
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">상담 안내</h4>
            <div className="space-y-2 text-sm">
              <p>전화: 051-951-4088</p>
              <p>이메일: sinegienter@gmail.com</p>
              <p>평일 09:00 - 18:00</p>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">주요 서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>• 개인회생 상담</li>
              <li>• 서류 준비 대행</li>
              <li>• 법원 신청 대리</li>
              <li>• 채무 조정 협상</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-sm text-gray-400 space-y-2">
            <p>사업자등록번호: 603-03-28356 (개업 1996년 03월 29일) | 대표변호사: 김태기 변호사 | 개인정보책임자: 김주휘 사무장</p>
            <p>개인회생 전문센터 대표사무장 김주휘 사무장</p>
            <p>주소: 부산광역시 연제구 거제동 1487-1 정림빌딩 907호</p>
            <p className="text-xs mt-4">
              본 사이트는 변호사 김태기 법률사무소 개인회생 전문센터로 개인회생 상담 및 법률 서비스를 제공하는 전문 기관입니다.
              개인정보는 철저히 보호되며, 상담 내용은 비밀이 보장됩니다.
            </p>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © 2026 변호사 김태기 법률사무소 개인회생 전문센터. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
