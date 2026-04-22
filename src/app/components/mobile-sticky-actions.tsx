import { useState, useEffect } from "react";
import { Phone, MessageCircle, ChevronRight } from "lucide-react";

export function MobileStickyActions() {
  const [tickerIndex, setTickerIndex] = useState(0);
  
  // 부산, 경남(창원, 김해, 양산 등), 울산 지역으로 타겟팅된 데이터
  const tickerData = [
    "방금 부산 연제구 김OO님 자가진단 완료",
    "3분 전 창원 성산구 이OO님 파산 면책 상담 신청",
    "12분 전 양산 물금읍 박OO님 8,500만원 탕감 성공",
    "방금 울산 남구 최OO님 실시간 전화 상담 중",
    "7분 전 김해 장유동 정OO님 압류 중지명령 결정",
    "방금 부산 사하구 강OO님 개인회생 인가 결정",
    "5분 전 거제시 문OO님 실시간 카톡 상담 대기 중"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 부드러운 스크롤 이동 함수
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-6 pointer-events-none">
      {/* 1. 지역 특화 실시간 상담 티커 */}
      <div className="flex justify-center mb-3">
        <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2 animate-bounce pointer-events-auto">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <p className="text-[11px] font-medium tracking-tight">
            {tickerData[tickerIndex]}
          </p>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* 2. 하단 고정 버튼 그룹 */}
      <div className="flex gap-2 pointer-events-auto">
        <a
          href="tel:070-8064-6525"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-900 py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          전화상담
        </a>
        
        <a
          href="#contact"
          onClick={scrollToContact}
          className="flex-[1.5] flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-emerald-500/30 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          무료상담 신청
        </a>
      </div>
    </div>
  );
}