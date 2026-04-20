import { Phone, FileText, CheckSquare, Scale, CheckCircle2, PhoneCall } from "lucide-react";

export function ProcessSteps() {
  const steps = [
    {
      icon: PhoneCall,
      title: "1. 무료 상담",
      description: "전화 또는 온라인으로 간편하게 상담을 받으세요. 개인회생 가능 여부를 즉시 확인해드립니다.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: FileText,
      title: "2. 서류 준비",
      description: "전담 매니저가 필요한 서류를 안내하고, 준비를 도와드립니다. 복잡한 서류 걱정 없이 진행하세요.",
      color: "bg-secondary/30 text-accent"
    },
    {
      icon: CheckSquare,
      title: "3. 법원 신청",
      description: "변호사가 직접 법원에 개인회생을 신청하고, 전담 매니저가 끝까지 함께합니다.",
      color: "bg-primary/20 text-primary"
    },
    {
      icon: Scale,
      title: "4. 채무 조정",
      description: "법원 심사를 통해 채무 감면율이 결정됩니다. 평균 70% 이상 감면됩니다.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: CheckCircle2,
      title: "5. 새로운 시작",
      description: "변제 계획에 따라 3~5년간 납부 후, 남은 빚은 모두 면제됩니다.",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            개인회생 진행 절차
          </h2>
          <p className="text-lg text-gray-600">
            복잡한 절차, 저희가 모두 대행해드립니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                  {Icon && <Icon className="w-7 h-7" />}
                </div>
                <h3 className="text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
          <p className="text-gray-700">
            <span className="text-primary font-semibold">평균 소요 기간:</span> 신청부터 인가까지 약 4~6개월
          </p>
        </div>
      </div>
    </section>
  );
}