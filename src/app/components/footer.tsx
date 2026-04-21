export function Footer() {
  return (
    <footer className="bg-[#1f2833] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              김태기 법률사무소<br />
              개인회생·파산 전문센터
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              15년 경력의 전문가가<br />
              회생 인가부터 파산 면책까지<br />
              당신의 새 출발을 책임집니다
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">상담 안내</h4>
            <div className="space-y-2 text-sm text-gray-400">
              {/* 푸터 번호 통일 */}
              <p>전화: <a href="tel:070-8064-6525" className="text-primary font-medium hover:underline">070-8064-6525</a></p>
              <p>이메일: sinegienter@gmail.com</p>
              <p>평일 09:00 - 18:00 (주말 및 공휴일 휴무)</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">주요 서비스</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 개인회생·파산 무료 진단</li>
              <li>• 복잡한 법원 서류 준비 대행</li>
              <li>• 법원 신청 및 보정명령 대리</li>
              <li>• 인가 결정 및 파산 면책 방어</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-sm text-gray-500 space-y-2">
            <p>사업자등록번호: 603-03-28356 (개업 1996년 03월 29일) | 대표변호사: 김태기 변호사 | 개인정보보호책임자: 김주희 사무장</p>
            <p>개인회생·파산 전문센터 전담: 김주희 사무장</p>
            <p>주소: 부산광역시 연제구 거제동 1487-1 정림빌딩 907호</p>
            <p className="text-xs mt-4 leading-relaxed">
              본 사이트는 변호사 김태기 법률사무소 개인회생·파산 전문센터로 빚 탕감 상담 및 법률 서비스를 제공하는 전문 기관입니다.<br />
              개인정보는 철저히 보호되며, 모든 상담 내용은 변호사법에 의거하여 비밀이 철저히 보장됩니다.
            </p>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            © 2026 변호사 김태기 법률사무소 개인회생·파산 전문센터. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}