import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "김○○",
      age: "42세",
      case: "채무 8천만원 → 2천만원",
      content: "카드빚과 대출로 막막했는데, 개인회생으로 빚의 75%가 면제되었습니다. 이제 희망을 갖고 살아갑니다.",
      rating: 5
    },
    {
      name: "이○○",
      age: "38세",
      case: "채무 1억 2천만원 → 3천만원",
      content: "사업 실패로 큰 빚을 졌지만, 전문가 덕분에 개인회생에 성공했습니다. 정말 감사합니다.",
      rating: 5
    },
    {
      name: "박○○",
      age: "45세",
      case: "채무 6천만원 → 1천5백만원",
      content: "복잡한 서류와 절차를 전담 매니저님이 다 도와주셔서 쉽게 진행할 수 있었습니다.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            실제 성공 사례
          </h2>
          <p className="text-lg text-gray-600">
            개인회생으로 새로운 삶을 시작한 분들의 이야기
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <div className="mb-4">
                <div className="text-lg mb-1">
                  {testimonial.name} ({testimonial.age})
                </div>
                <div className="text-sm text-primary font-medium">
                  {testimonial.case}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            ※ 개인정보 보호를 위해 이름은 익명 처리되었습니다. 실제 사례이며, 결과는 개인별로 상이할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}