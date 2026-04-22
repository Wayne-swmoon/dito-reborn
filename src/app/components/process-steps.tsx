import { Phone, FileText, CheckSquare, Scale, CheckCircle2, PhoneCall } from "lucide-react";

export function ProcessSteps() {
  const steps = [
    {
      icon: PhoneCall,
      title: "1. 1:1 맞춤 상담",
      description: "전화나 온라인으로 편하게 문의하세요. 소득과 재산을 분석하여 회생/파산 중 가장 유리한 제도를 진단해 드립니다.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: FileText,
      title: "2. 서류 준비 및 수임",
      description: "전담팀이 복잡한 법원 제출 서류를 꼼꼼하게 챙겨드립니다. 고객님은 안내에 따라 기본 서류만 발급해 주시면 됩니다.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CheckSquare,
      title: "3. 빠른 접수 및 금지명령",
      description: "빠른 시일내에 신청서를 접수하고, 일주일 안에 금지 또는 중지 결정을 통한 채권추심 금지 또는 중단이 가능합니다.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Scale,
      title: "4. 법원 심사 및 인가/면책",
      description: "법원의 까다로운 보정 권고에 철저히 대응하여, 가장 유리한 조건으로 회생 인가 또는 파산 면책 결정을 이끌어냅니다.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CheckCircle2,
      title: "5. 채무 탕감 완료",
      description: "회생은 3~5년 변제 후 남은 원금을, 파산은 즉시 채무 전액(100%)을 면책받고 신용을 회복하여 새 출발 합니다.",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            개인회생·파산 진행 절차
          </h2>
          <p className="text-lg text-gray-600">
            복잡한 법원 절차, 변호사 김태기 전담팀이 처음부터 끝까지 책임집니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative">
          {/* 절차를 이어주는 선 (PC에서만 보임) */}
          <div className="hidden xl:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative z-10 p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-emerald-50 rounded-2xl text-center border border-emerald-100 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Scale className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-gray-700 text-sm md:text-base text-left">
            <strong className="text-emerald-700 font-bold block md:inline mb-1 md:mb-0">평균 소요 기간 안내 :</strong> 법원의 관할과 사건 난이도에 따라 신청부터 최종 인가/면책까지 평균 6개월 ~ 1년 정도 소요됩니다. 철저한 사전 준비로 기간을 단축해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}