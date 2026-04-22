import { useState } from "react";
import { Zap, ShieldCheck, HeartHandshake, HelpCircle, PhoneCall } from "lucide-react";

export function MobileSpecialFeature() {
  const [activeTab, setActiveTab] = useState<'benefit' | 'check'>('benefit');

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "원금 최대 90~100% 탕감", desc: "합법적으로 빚의 대부분을 지워드립니다." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "독촉·압류 즉시 중단", desc: "신청 즉시 금지명령으로 일상을 보호합니다." },
    { icon: <HeartHandshake className="w-5 h-5" />, title: "가족 몰래 진행 가능", desc: "비밀 유지 엄수, 직장/가족 통보 없습니다." },
  ];

  const checkList = [
    { icon: <HelpCircle className="w-5 h-5" />, title: "총 채무액 확인", desc: "은행, 카드사, 사채 등 모든 빚 합계" },
    { icon: <HelpCircle className="w-5 h-5" />, title: "현재 소득 유무", desc: "직장인, 알바, 혹은 무직 여부" },
    { icon: <HelpCircle className="w-5 h-5" />, title: "보유 재산 현황", desc: "본인 명의의 집, 차, 보증금 등" },
  ];

  return (
    <section className="py-16 bg-slate-50 lg:hidden"> {/* 모바일 전용: PC에서는 숨김 처리 가능 */}
      <div className="container mx-auto px-6">
        
        {/* 탭 헤더: 엄지로 누르기 편하게 큼직하게 */}
        <div className="flex bg-white p-1 rounded-2xl shadow-sm mb-8 border border-slate-200">
          <button 
            onClick={() => setActiveTab('benefit')}
            className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === 'benefit' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'}`}
          >
            신청 시 혜택
          </button>
          <button 
            onClick={() => setActiveTab('check')}
            className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === 'check' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'}`}
          >
            상담 전 체크리스트
          </button>
        </div>

        {/* 탭 컨텐츠: 카드 스택 스타일 */}
        <div className="space-y-4 min-h-[380px]">
          {(activeTab === 'benefit' ? benefits : checkList).map((item, i) => (
            <div 
              key={i} 
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 전용 플로팅 느낌의 하단 버튼 */}
        <div className="mt-10">
          <a 
            href="tel:070-8064-6525"
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
          >
            <PhoneCall className="w-6 h-6 text-emerald-400" />
            지금 바로 전화 상담하기
          </a>
          <p className="text-center text-[11px] text-slate-400 mt-4">
            ※ 전화 버튼을 누르면 바로 연결됩니다. (상담료 0원)
          </p>
        </div>

      </div>
    </section>
  );
}