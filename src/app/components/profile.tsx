import { CheckCircle2, Quote, ShieldCheck } from "lucide-react";

export function ProfileSection() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 프로필 카드 영역 */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden">
          
          {/* 장식용 배경 요소 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
          
          {/* 1. 원형 사진 영역 */}
          <div className="flex-shrink-0 relative z-10">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
              <img 
                src="/profile.jpg" 
                alt="김주휘 총괄사무장" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* 신뢰의 뱃지 포인트 */}
            <div className="absolute -bottom-2 -right-2 bg-[#344191] text-white p-4 rounded-full shadow-lg border-4 border-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          {/* 2. 소개 및 경력 텍스트 영역 */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="mb-2 text-emerald-600 font-bold tracking-tight">변호사 김태기 개인회생·파산 전문센터</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e1423] mb-6">
              김주휘 <span className="text-2xl font-bold text-gray-500 ml-1">총괄사무장</span>
            </h2>

            {/* 진심이 담긴 인사말 (랜딩페이지 톤앤매너 활용) */}
            <div className="relative bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-gray-200 rotate-180" />
              <p className="relative z-10 text-gray-700 font-medium leading-relaxed pl-8 text-sm md:text-base">
                "혼자 감당하기 벅찬 빚의 무게, 이제 제가 덜어드리겠습니다.<br className="hidden md:block"/>
                지독한 독촉의 고통에서 벗어나 새로운 내일을 시작하실 수 있도록,<br className="hidden md:block"/>
                베테랑 책임 사무장의 이름을 걸고 끝까지 함께하겠습니다."
              </p>
            </div>

            {/* 핵심 경력 리스트 */}
            <ul className="space-y-3.5 text-gray-700 font-medium text-sm md:text-base">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span><strong className="text-[#1e1423]">현) 변호사 김태기 법률사무소</strong> 개인회생/파산 총괄사무장</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span><strong className="text-[#1e1423]">부산·경남·울산 전 지역</strong> 1:1 맞춤형 채무 진단 전담</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>신속한 <strong className="text-[#1e1423]">금지명령(추심 즉시 중단)</strong> 및 인가결정 성공 사례 다수</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}