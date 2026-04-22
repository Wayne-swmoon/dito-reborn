import { useState, useEffect, useRef } from "react";
import { TrendingDown, ShieldCheck, ArrowRightCircle } from "lucide-react";

export function DebtReductionChart() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDebt, setCurrentDebt] = useState(100000000); // 시작 금액: 1억
  const targetDebt = 10000000; // 목표 금액: 1천만 (90% 탕감)
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // 숫자 카운팅 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    let start = 100000000;
    const duration = 2000; // 2초 동안 진행
    const frameRate = 30; // 프레임 간격
    const totalFrames = Math.round(duration / frameRate);
    const decrement = (start - targetDebt) / totalFrames;

    const timer = setInterval(() => {
      start -= decrement;
      if (start <= targetDebt) {
        start = targetDebt;
        clearInterval(timer);
      }
      setCurrentDebt(Math.floor(start));
    }, frameRate);

    return () => clearInterval(timer);
  }, [isVisible]);

  // 진행률 (가로 바 너비)
  const progressPercent = (currentDebt / 100000000) * 100;
  const isFinished = currentDebt === targetDebt;

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>법원이 보장하는 합법적 빚 탕감</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              감당 안 되는 <span className="text-red-500">빚더미</span>,<br />
              눈앞에서 <span className="text-emerald-600">사라집니다.</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              매달 이자 갚기도 벅찬 상황이신가요?<br />
              개인회생·파산 제도를 통해 <strong className="text-gray-900 font-bold">최대 100%까지 원금을 면책</strong>받고, 빚의 굴레에서 완전히 벗어날 수 있습니다.
            </p>

            <a 
              href="#diagnosis" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-emerald-600 transition-colors text-lg font-bold shadow-lg group"
            >
              내 예상 탕감액 확인하기
              <ArrowRightCircle className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right: Interactive Dashboard Card */}
          <div className="relative z-10">
            <div className="bg-[#1f2833] rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-800 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold text-white">채무 조정 시뮬레이션</h3>
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-1000 ${isFinished ? 'bg-emerald-500 text-white' : 'bg-red-500/20 text-red-400'}`}>
                  {isFinished ? '조정 완료' : '조정 중...'}
                </div>
              </div>

              {/* Number Display */}
              <div className="mb-10">
                <p className="text-gray-400 text-sm mb-2">남은 총 채무액</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl lg:text-6xl font-extrabold tabular-nums tracking-tighter transition-colors duration-500 ${isFinished ? 'text-emerald-400' : 'text-white'}`}>
                    {currentDebt.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-400 font-bold">원</span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">기존 채무액 (100%)</span>
                  <span className={isFinished ? 'text-emerald-400' : 'text-gray-400'}>
                    {isFinished ? '최대 90% 탕감 적용' : ''}
                  </span>
                </div>
                <div className="h-6 w-full bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-75 ease-linear ${isFinished ? 'bg-emerald-500' : 'bg-gradient-to-r from-red-600 to-red-400'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Completion Stamp / Badge */}
              <div className={`mt-8 pt-8 border-t border-gray-700 flex items-center justify-between transition-opacity duration-1000 ${isFinished ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">탕감된 금액</p>
                    <p className="text-xl font-bold text-emerald-400">90,000,000원 세이브!</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] -z-10 rounded-full"></div>
          </div>

        </div>
      </div>
    </section>
  );
}