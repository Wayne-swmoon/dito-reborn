import { Shield, Users, FileCheck, HeadphonesIcon, Award, Lock } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "법무법인 공식 파트너",
      description: "대형 법무법인과 공식 제휴로 안전하고 정확한 법률 서비스를 제공합니다."
    },
    {
      icon: Users,
      title: "15년 경력 전문가",
      description: "개인회생 전문 변호사와 채무 전문가가 직접 상담하고 진행합니다."
    },
    {
      icon: FileCheck,
      title: "승인율 97.8%",
      description: "2024년 기준 97.8%의 높은 승인율로 검증된 노하우를 제공합니다."
    },
    {
      icon: HeadphonesIcon,
      title: "전담 매니저 배정",
      description: "처음부터 끝까지 1:1 전담 매니저가 모든 과정을 책임집니다."
    },
    {
      icon: Award,
      title: "성공 보수제",
      description: "초기 비용 부담 없이 시작할 수 있으며, 성공 후 합리적인 비용만 청구합니다."
    },
    {
      icon: Lock,
      title: "철저한 보안",
      description: "개인정보는 암호화되어 관리되며, 상담 내용은 절대 외부에 유출되지 않습니다."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            왜 저희를 선택해야 할까요?
          </h2>
          <p className="text-lg text-gray-600">
            15년간 5,000건 이상의 성공 사례로 검증된 전문성
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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