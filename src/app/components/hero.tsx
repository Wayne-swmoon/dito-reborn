import { Phone, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1f2833] via-[#2d3a42] to-[#1a2128] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full">
              <p className="text-sm">✓ 변호사 김태기 법률사무소 개인회생 전문센터</p>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl">
              빚 때문에 힘드신가요?<br /><br />
              <span className="text-primary">개인회생</span>으로<br />
              당신의 <span className="text-primary">삶</span>을 바꾸세요!
            </h1>
            
            <p className="text-lg text-gray-300">
              채무 최대 90% 감면, 이자 전액 면제<br />
              15년 경력의 전문가가 성공까지 책임집니다
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span>상담료 및 초기 비용 무료</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span>승인율 97.8% 달성 (2024년, 2025년 기준)</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span>서류 준비부터 법원 인가까지 전담 지원</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg shadow-lg font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                무료 상담 신청
              </a>
              <a 
                href="#process" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/30"
              >
                진행 절차 보기
              </a>
            </div>

            <p className="text-sm text-gray-400">
              ※ 개인정보는 상담 목적으로만 사용되며, 철저히 보호됩니다
            </p>
          </div>

          {/* Right Image */}
          <div className="relative lg:block hidden">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1586751419103-b120dc6f6314?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVCJUI5JTlBJUVDJTlDJUJDJUVCJUExJTlDJTIwJUVBJUIzJUEwJUVEJTg2JUI1JUVCJUIwJTlCJUVCJThBJTk0JTIwJUVDJTk3JUFDJUVDJTg0JUIxfGVufDB8fDB8fHww"
                alt="행복한 가족"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xl">
                  "개인회생 후 새로운 삶을 시작했습니다!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}