import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "개인회생이란 무엇인가요?",
      answer: "개인회생은 빚을 갚기 어려운 개인 채무자가 법원의 허가를 받아 일정 기간(3~5년) 동안 채무의 일부를 변제하고, 나머지는 면제받는 제도입니다. 최대 90%까지 채무 감면이 가능하며, 이자도 전액 면제됩니다."
    },
    {
      question: "개인회생 신청 자격은 어떻게 되나요?",
      answer: "일정한 수입이 있고, 총 채무액이 무담보 채무 5억원 이하, 담보부 채무 10억원 이하인 경우 신청 가능합니다. 급여 소득자, 자영업자, 프리랜서 모두 신청할 수 있습니다."
    },
    {
      question: "개인회생 비용은 얼마나 드나요?",
      answer: "초기 상담은 무료이며, 법원 비용과 변호사 수임료가 발생합니다. 저희는 성공 보수제로 운영하여 초기 부담을 최소화했으며, 분할 납부도 가능합니다. 정확한 비용은 상담 시 안내드립니다."
    },
    {
      question: "개인회생 신청 후 신용등급은 어떻게 되나요?",
      answer: "개인회생 신청 시 신용등급이 하락하지만, 변제 계획을 성실히 이행하면 3~5년 후 면책 결정과 함께 신용 회복이 가능합니다. 면책 후에는 정상적인 경제 활동을 할 수 있습니다."
    },
    {
      question: "개인회생 승인까지 얼마나 걸리나요?",
      answer: "신청부터 인가까지 평균 4~6개월이 소요됩니다. 서류가 완벽하게 준비되고, 법원 일정에 따라 기간이 달라질 수 있습니다. 저희 전담 매니저가 빠른 진행을 위해 최선을 다합니다."
    },
    {
      question: "개인회생 중에도 직장 생활이 가능한가요?",
      answer: "네, 가능합니다. 개인회생은 채무자의 경제적 재기를 돕는 제도이므로 정상적인 직장 생활과 소득 활동을 할 수 있습니다. 오히려 안정적인 소득이 있어야 변제 계획을 이행할 수 있습니다."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-gray-600">
            개인회생에 대해 궁금한 점을 확인하세요
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <span className="pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-accent text-white rounded-xl">
          <p className="text-lg mb-4">
            더 궁금한 점이 있으신가요?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            전문가에게 직접 물어보기
          </a>
        </div>
      </div>
    </section>
  );
}