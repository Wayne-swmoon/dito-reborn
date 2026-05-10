import { Phone, CheckCircle, ArrowDown, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex flex-col items-center overflow-hidden bg-[#111827]">
      
      {/* [1. 배경 이미지 레이어] */}
      <div className="absolute inset-0 z-0 h-[50vh] lg:h-full">
        <img
          src="/new-life.jpg" 
          alt="새로운 출발"
          className="w-full h-full object-cover object-top lg:object-right brightness-[0.75] lg:brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-[#111827] lg:bg-gradient-to-r lg:from-gray-900/95 lg:via-gray-900/60 lg:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* [2. 콘텐츠 영역] */}
          {/* 하단 스티키 바와 겹치지 않도록 모바일에서 충분한 하단 여백(pb-32) 부여 */}
          <div className="mt-[32vh] lg:mt-0 space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom duration-1000 pb-32 lg:pb-0">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md">
              <p className="text-[11px] lg:text-sm text-emerald-400 font-bold">✓ 변호사 김태기 개인회생·파산 전문센터</p>
            </div>

            <h1 className="text-[34px] lg:text-7xl font-bold leading-[1.3] lg:leading-[1.1] tracking-tight text-white">
              당신의 무너진 일상,<br />
              <span className="text-emerald-400">다시 세울 수 있습니다.</span>
            </h1>

            <p className="text-base lg:text-xl text-gray-300 leading-relaxed font-medium max-w-lg">
              15년 경력, 5,000건 이상의 성공 데이터.<br className="hidden lg:block" />
              <strong className="text-white">개인회생·파산</strong>, 이제 고민 대신 결정을 하실 때입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-bold text-base lg:text-lg">원금 최대 90% 탕감</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-bold text-base lg:text-lg">압류 및 추심 즉시 중단</span>
              </div>
            </div>

            {/* 본문 내 버튼: 원래대로 복구 (자가진단/상담신청) */}
            <div className="flex flex-col gap-4 pt-4 lg:flex-row lg:gap-6">
              <a
                href="#contact"
                className="flex items-center justify-center px-8 py-4.5 bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition-all rounded-xl shadow-lg font-bold text-lg lg:text-xl"
              >
                <Phone className="w-5 h-5 mr-3" />
                무료 법률 상담 신청
              </a>
              <a 
                href="#diagnosis" 
                className="flex items-center justify-center px-8 py-4.5 bg-white/10 text-white hover:bg-white/20 transition-all rounded-xl border border-white/30 backdrop-blur-md font-bold text-lg lg:text-xl"
              >
                1분 자가진단 시작
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ⚡ [핵심] 하단 고정 스티키 바: 중복 요소를 제거하고 오렌지/옐로우 딱 두 개만 구성 */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex lg:hidden bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.2)] p-3 gap-3">
        <a 
          href="tel:051-123-4567" 
          className="flex-1 flex items-center justify-center py-4 bg-[#FF6B00] text-white rounded-xl font-black text-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 mr-2" /> 전화상담
        </a>
        <a 
          href="#contact" 
          className="flex-1 flex items-center justify-center py-4 bg-[#FFE600] text-slate-900 rounded-xl font-black text-lg active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 mr-2 text-slate-900" /> 무료상담 신청
        </a>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/20 hidden lg:block">
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}