import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper 스타일 임포트
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Testimonials() {
  const testimonials = [
    {
      type: "개인회생",
      typeColor: "bg-emerald-100 text-emerald-700",
      name: "김○○",
      age: "42세 직장인",
      case: "채무 8천만원 → 2천만원",
      content: "카드빚과 대출로 막막했는데, 개인회생으로 빚의 75%가 면제되었습니다. 덕분에 소중한 제 집도 지키고 희망을 갖고 살아갑니다.",
      rating: 5
    },
    {
      type: "개인파산",
      typeColor: "bg-blue-100 text-blue-700",
      name: "최○○",
      age: "55세 무직",
      case: "채무 1억 5천만원 → 전액 면책",
      content: "건강 악화로 일자리를 잃고 빚더미에 앉아 삶을 포기하고 싶었습니다. 변호사님 덕분에 파산 면책을 받아 채무 100%를 탕감받고 새 생명을 얻었습니다.",
      rating: 5
    },
    {
      type: "개인회생",
      typeColor: "bg-emerald-100 text-emerald-700",
      name: "이○○",
      age: "38세 자영업",
      case: "채무 1억 2천만원 → 3천만원",
      content: "사업 실패로 매일 독촉 전화에 시달렸습니다. 복잡한 서류와 절차를 전담 매니저님이 다 도와주셔서 무사히 인가받고 새 출발을 준비 중입니다.",
      rating: 5
    },
    {
      type: "개인파산",
      typeColor: "bg-blue-100 text-blue-700",
      name: "박○○",
      age: "62세 주부",
      case: "채무 9천만원 → 전액 면책",
      content: "남편의 빚 보증으로 평생을 고통 속에 살았습니다. 김태기 변호사님을 만나 파산 면책을 받고 나서야 30년 만에 발 뻗고 잠을 잘 수 있게 되었습니다.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            실제 성공 사례
          </h2>
          <p className="text-lg text-gray-600">
            변호사 김태기 법률사무소 개인회생·파산 전문센터와 함께 빚의 굴레에서 벗어난 분들의 생생한 기록
          </p>
        </div>

        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="h-full p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col min-h-[350px]">
                  <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-sm font-bold ${testimonial.typeColor}`}>
                    {testimonial.type}
                  </div>

                  <div className="flex gap-1 mb-4 pt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="mb-5">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {testimonial.name} <span className="text-sm font-normal text-gray-500">({testimonial.age})</span>
                    </div>
                    <div className={`text-base font-semibold ${testimonial.type === '개인파산' ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {testimonial.case}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed font-medium flex-1">
                    "{testimonial.content}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 버튼 */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* 커스텀 페이지네이션 (점) */}
          <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            ※ 개인정보 보호를 위해 익명 처리되었으며, 실제 사례입니다.
          </p>
        </div>
      </div>
    </section>
  );
}