import { Shield, Users, FileCheck, HeadphonesIcon, Award, Lock } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "개인회생·파산 전문센터",
      description: "풍부한 실무 경험을 갖춘 판사 출신 변호사가 안전하고 정확한 맞춤형 법률 서비스를 제공합니다."
    },
    {
      icon: Users,
      title: "15년 경력 전문가 전담",
      description: "회생·파산 사건을 전담해 온 전문 변호사와 대표 사무장이 직접 상담부터 최종 인가/면책까지 책임집니다."
    },
    {
      icon: FileCheck,
      title: "인가 및 면책 성공률 97.8%",
      description: "2024~2025년 기준 97.8%의 압도적인 성공률로 검증된 노하우와 철저한 사건 관리 시스템을 자랑합니다."
    },
    {
      icon: HeadphonesIcon,
      title: "1:1 전담 매니저 밀착 관리",
      description: "상담부터 복잡한 서류 준비, 법원 보정 권고 대응까지 1:1 전담 매니저가 배치되어 모든 과정을 밀착 지원합니다."
    },
    {
      icon: Award,
      title: "100% 무료 상담 및 비용 분할납부",
      description: "초기 비용 부담 없이 1:1 맞춤 진단을 받아보세요. 수임료 자체 분할 납부 시스템으로 당장의 경제적 부담을 확실히 덜어드립니다."
    },
    {
      icon: Lock,
      title: "가족/직장 철저한 비밀 보장",
      description: "직장이나 가족 모르게 조용히 진행 가능합니다. 모든 상담 내용과 개인정보는 변호사법에 의거하여 철저히 보안 유지됩니다."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            왜 김태기 법률사무소일까요?
          </h2>
          <p className="text-lg text-gray-600">
            15년간 5,000건 이상의 압도적인 성공 사례로 검증된 전문성
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}