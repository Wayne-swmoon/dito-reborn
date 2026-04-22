import { Phone, CheckCircle, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000" 
          alt="Professional Law Office"
          className="w-full h-full object-cover"
        />
        {/* 그라데이션 오버레이: 왼쪽 텍스트 가독성 집중 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            {/* 수정된 뱃지 문구 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-sm font-bold text-emerald-400">변호사 김태기 법률사무소 개인회생파산 전문센터</p>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              무너진 일상,<br />
              <span className="text-emerald-400">다시 세울 수</span><br />
              있습니다.
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
              15년 경력, 5,000건 이상의 성공 데이터가 증명합니다.<br />
              <span className="text-white font-medium">개인회생·파산</span>, 이제 고민 대신 결정을 하실 때입니다.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-semibold text-lg text-white">원금 최대 90% 탕감</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-semibold text-lg text-white">압류 및 추심 즉시 중단</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center px-8 py-5 bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition-all rounded-2xl shadow-2xl shadow-emerald-500/20 font-bold text-xl"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                무료 법률 상담 신청
              </a>
              <a 
                href="#diagnosis" 
                className="inline-flex items-center justify-center px-8 py-5 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/20 backdrop-blur-md font-bold text-lg"
              >
                1분 자가진단 시작
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 유도 유닛 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Scroll Down</span>
        <ArrowDown className="w-4 h-4 opacity-60" />
      </div>
    </section>
  );
}