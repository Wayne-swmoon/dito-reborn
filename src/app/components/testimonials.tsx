import { Star, ChevronLeft, ChevronRight, TrendingDown, Clock, Wallet, ArrowRight, UserCircle } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Testimonials() {
  const testimonials = [
    {
      tag: "2030 직장인 / 3천만원 구간",
      typeColor: "bg-emerald-100 text-emerald-700",
      title: "사회초년생 C씨 (IT기업 근무)",
      debt: "3,200만원 (카드론/소액대출)",
      payment: "월 28만원 × 36개월",
      reduction: "68%",
      duration: "3개월 인가",
      content: "생활비로 시작된 돌려막기가 걷잡을 수 없었는데, 조기에 대응해서 원금의 상당 부분을 탕감받고 신용회복 중입니다.",
      rating: 5
    },
    {
      tag: "자영업자 / 1억 이상 구간",
      typeColor: "bg-blue-100 text-blue-700",
      title: "부산 식당 운영 A씨 (40대)",
      debt: "1억 8,000만원 (사업자금)",
      payment: "월 95만원 × 36개월",
      reduction: "81%",
      duration: "5개월 인가",
      content: "폐업 위기에서 변호사님을 만났습니다. 사업자 채무는 복잡하다던데, 깔끔하게 정리해주셔서 다시 재기할 힘을 얻었습니다.",
      rating: 5
    },
    {
      tag: "공무원·대기업 / 고정소득",
      typeColor: "bg-purple-100 text-purple-700",
      title: "공무원 K씨 (40대 외벌이)",
      debt: "9,500만원 (주식/가상화폐)",
      payment: "월 110만원 × 36개월",
      reduction: "58%",
      duration: "4개월 인가",
      content: "직장에 알려질까 봐 가장 두려웠는데, 철저한 비밀 유지 속에 인가까지 무사히 마쳤습니다. 이제 급여 압류 걱정 없이 근무합니다.",
      rating: 5
    },
    {
      tag: "전업주부 / 생활비 채무",
      typeColor: "bg-pink-100 text-pink-700",
      title: "주부 L씨 (50대 거제 거주)",
      debt: "5,400만원 (가계대출/지인채무)",
      payment: "월 15만원 × 36개월",
      reduction: "90%",
      duration: "6개월 인가",
      content: "남편 모르게 불어난 빚 때문에 극단적인 생각까지 했어요. 낮은 변제금으로 확정해주셔서 가족들 모르게 새 출발 했습니다.",
      rating: 5
    },
    {
      tag: "프리랜서 / 소득 불규칙",
      typeColor: "bg-orange-100 text-orange-700",
      title: "프리랜서 디자이너 P씨 (30대)",
      debt: "4,800만원 (학자금/연체)",
      payment: "월 32만원 × 36개월",
      reduction: "76%",
      duration: "4개월 인가",
      content: "소득이 일정치 않아 거절당할까 걱정했는데, 프리랜서 맞춤형으로 소득 증빙을 도와주셔서 무사히 통과되었습니다.",
      rating: 5
    },
    {
      tag: "개인파산 / 기초수급자",
      typeColor: "bg-slate-100 text-slate-700",
      title: "무직 S씨 (60대 창원 거주)",
      debt: "1억 2,000만원 (병원비/연체)",
      payment: "전액 면책 (0원)",
      reduction: "100%",
      duration: "7개월 확정",
      content: "몸이 아파 도저히 갚을 능력이 없었는데, 파산 면책으로 빚을 전부 탕감받았습니다. 이제야 다시 숨을 쉽니다.",
      rating: 5
    },
    {
      tag: "제조업 종사자 / 중숙련공",
      typeColor: "bg-cyan-100 text-cyan-700",
      title: "생산직 J씨 (40대 양산 근무)",
      debt: "7,800만원 (사채/카드연체)",
      payment: "월 48만원 × 36개월",
      reduction: "78%",
      duration: "4개월 인가",
      content: "사채 독촉 때문에 공장까지 찾아올까 봐 매일 떨었습니다. 신청 직후 금지명령으로 독촉이 멈춘 게 가장 행복했습니다.",
      rating: 5
    },
    {
      tag: "청년 / 투자 실패",
      typeColor: "bg-indigo-100 text-indigo-700",
      title: "취준생 H씨 (20대)",
      debt: "4,200만원 (코인 투자 실패)",
      payment: "월 22만원 × 36개월",
      reduction: "81%",
      duration: "3개월 인가",
      content: "투자로 인한 빚은 안 될 줄 알았는데, 반성문과 계획서를 꼼꼼히 챙겨주신 덕분에 큰 감면을 받았습니다.",
      rating: 5
    },
    {
      tag: "일용직 / 저소득 구간",
      typeColor: "bg-yellow-100 text-yellow-700",
      title: "건설 현장직 M씨 (50대)",
      debt: "6,500만원 (오래된 빚)",
      payment: "월 25만원 × 36개월",
      reduction: "86%",
      duration: "5개월 인가",
      content: "10년 전 빚이 계속 따라다녔는데, 이제야 정리했습니다. 서류 준비가 힘들었는데 매니저님이 친절히 다 알려주셨어요.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">맞춤형 성공 사례</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            내 상황과 비슷한 케이스를 찾아보세요. <br className="hidden lg:block"/> 리본마이라이프가 해결책을 제시해 드립니다.
          </p>
        </div>

        <div className="relative lg:px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.2, centeredSlides: true },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col min-h-[560px]">
                  {/* 상단 태그 및 매칭 강조 */}
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-lg text-[11px] font-black tracking-wider ${item.typeColor}`}>
                        {item.tag}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-slate-400" /> {item.title}
                    </h3>
                  </div>

                  {/* 📊 데이터 영역: 유저가 자기 케이스와 비교하는 핵심 포인트 */}
                  <div className="bg-slate-50/80 rounded-2xl p-5 space-y-3.5 mb-6 border border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2 text-slate-500 font-medium"><Wallet className="w-4 h-4" /> 채무액</span>
                      <span className="font-bold text-slate-900">{item.debt}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2 text-slate-500 font-medium"><TrendingDown className="w-4 h-4" /> 월 변제금</span>
                      <span className="font-bold text-emerald-600">{item.payment}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3 mt-1">
                      <span className="flex items-center gap-2 text-slate-500 font-medium"><ArrowRight className="w-4 h-4" /> 감면율</span>
                      <span className="font-black text-blue-600 text-xl">▼ {item.reduction}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2 text-slate-500 font-medium"><Clock className="w-4 h-4" /> 처리결과</span>
                      <span className="font-semibold text-slate-700">{item.duration}</span>
                    </div>
                  </div>
                  
                  {/* 리뷰 내용 */}
                  <p className="text-slate-600 text-[15px] leading-relaxed font-medium mb-8 flex-1 italic">
                    "{item.content}"
                  </p>

                  {/* 행동 촉구 버튼 */}
                  <a 
                    href="#contact"
                    className="flex items-center justify-center w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-200"
                  >
                    이 케이스와 비슷하다면? 무료상담
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full hidden lg:flex items-center justify-center shadow-md hover:bg-emerald-500 hover:text-white transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-slate-200 rounded-full hidden lg:flex items-center justify-center shadow-md hover:bg-emerald-500 hover:text-white transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
        </div>
      </div>
    </section>
  );
}