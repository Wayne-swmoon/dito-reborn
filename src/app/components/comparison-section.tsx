import { Check, Scale, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 헤더: 폰트 크기 강제 고정 */}
        <div className="text-center mb-20">
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em' }} className="text-gray-900 mb-6">
            나에게 맞는 <span style={{ color: '#10b981' }}>최적의 제도</span>는?
          </h2>
          <p className="text-xl text-gray-500 font-light">
            복잡한 법률 용어 대신, 핵심만 확실하게 비교해 드립니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 relative">
          
          {/* 개인회생 Card */}
          <div className="relative bg-[#f0fdf4] rounded-[3rem] p-12 border-2 border-[#dcfce7] shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#10b981] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[#059669] font-bold tracking-widest text-sm uppercase">Recovery Plan</span>
            </div>
            
            {/* 극단적 강약 조절 타이틀 */}
            <h3 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.05em' }} className="text-slate-900">
              개인<span style={{ color: '#10b981' }}>회생</span>
            </h3>
            
            {/* 형광펜 효과 강제 적용 */}
            <p className="text-2xl text-slate-700 leading-snug mb-12">
              일정한 소득이 있다면,<br />
              <span style={{ backgroundColor: '#bbf7d0', padding: '0 8px', fontWeight: 800, color: '#064e3b' }}>
                재산을 지키며
              </span> 빚을 탕감받으세요.
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b-2 border-[#dcfce7] pb-4">
                <span className="text-gray-500 font-bold">원금 탕감</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>최대 90%</span>
              </div>
              <div className="flex justify-between items-end border-b-2 border-[#dcfce7] pb-4">
                <span className="text-gray-500 font-bold">재산 보유</span>
                <span className="text-xl font-extrabold text-slate-800">집·차량 유지 가능</span>
              </div>
            </div>
          </div>

          {/* 개인파산 Card */}
          <div className="relative bg-[#eff6ff] rounded-[3rem] p-12 border-2 border-[#dbeafe] shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#3b82f6] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[#2563eb] font-bold tracking-widest text-sm uppercase">Bankruptcy Plan</span>
            </div>

            {/* 극단적 강약 조절 타이틀 */}
            <h3 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.05em' }} className="text-slate-900">
              개인<span style={{ color: '#3b82f6' }}>파산</span>
            </h3>

            {/* 형광펜 효과 강제 적용 */}
            <p className="text-2xl text-slate-700 leading-snug mb-12">
              소득이 없어도 괜찮습니다.<br />
              <span style={{ backgroundColor: '#bfdbfe', padding: '0 8px', fontWeight: 800, color: '#1e3a8a' }}>
                원금 100%를
              </span> 즉시 면책받으세요.
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b-2 border-[#dbeafe] pb-4">
                <span className="text-gray-500 font-bold">원금 탕감</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3b82f6' }}>전액(100%) 면책</span>
              </div>
              <div className="flex justify-between items-end border-b-2 border-[#dbeafe] pb-4">
                <span className="text-gray-500 font-bold">신청 대상</span>
                <span className="text-xl font-extrabold text-slate-800">무직·고령·환자 등</span>
              </div>
            </div>
          </div>

        </div>

        {/* 하단 블랙 배너: 시각적 임팩트 끝판왕 */}
        <div className="mt-20 bg-[#111827] rounded-[3.5rem] p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h4 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', lineHeight: 1.3 }} className="mb-10">
              나에게 <span style={{ color: '#10b981' }}>가장 유리한 제도</span>는 무엇일까?<br />
              <span style={{ fontSize: '1.2rem', color: '#9ca3af', fontWeight: 400 }}>김태기 변호사 전담팀이 1:1 비밀 상담으로 알려드립니다.</span>
            </h4>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="#diagnosis" style={{ fontSize: '1.3rem' }} className="px-12 py-6 bg-[#10b981] text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">
                1분 자가진단 시작하기
              </a>
            </div>
          </div>
          <ShieldCheck style={{ opacity: 0.05 }} className="absolute -right-10 -bottom-10 w-80 h-80 text-white transform rotate-12" />
        </div>

      </div>
    </section>
  );
}