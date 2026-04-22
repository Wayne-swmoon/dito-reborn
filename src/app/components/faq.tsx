import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "개인회생과 개인파산의 가장 큰 차이점은 무엇인가요?",
      answer: "가장 큰 기준은 '소득의 유무'입니다. 최저생계비 이상의 일정한 소득이 있다면 매월 빚을 나누어 갚는 '개인회생'을 진행하며 재산을 지킬 수 있습니다. 반면, 소득이 없거나 최저생계비 미만이라면 재산을 처분하는 대신 남은 빚을 전액(100%) 탕감받는 '개인파산'을 진행하게 됩니다."
    },
    {
      question: "개인파산을 하면 가족에게 불이익이 가나요?",
      answer: "아니요, 그렇지 않습니다. 개인파산 및 면책의 효력은 신청인 본인에게만 미칩니다. 따라서 가족의 재산에 압류가 들어오거나 가족의 신용등급이 하락하는 등 가족에게 가는 법적인 불이익은 전혀 없습니다. (단, 가족 명의로 재산을 빼돌린 경우는 제외)"
    },
    {
      question: "개인회생 신청 자격은 어떻게 되나요?",
      answer: "일정한 수입이 있고, 총 채무액이 무담보 채무 10억원 이하, 담보부 채무 15억원 이하인 경우 신청 가능합니다. 정규직 급여 소득자뿐만 아니라 자영업자, 일용직, 아르바이트, 프리랜서 등 소득 증빙이 가능하다면 누구나 신청할 수 있습니다."
    },
    {
      question: "개인회생/파산 진행 시 비용은 얼마나 드나요?",
      answer: "초기 1:1 맞춤 상담은 100% 무료입니다. 이후 절차 진행 시 법원 인지대, 송달료, 파산관재인 선임비(파산의 경우) 및 변호사 수임료가 발생합니다. 저희 변호사 김태기 법률사무소는 의뢰인의 경제적 부담을 줄여드리기 위해 수임료 자체 분할 납부 시스템을 운영하고 있습니다."
    },
    {
      question: "개인회생 중에도 직장 생활이나 이직이 가능한가요?",
      answer: "네, 당연히 가능합니다. 회생과 파산은 채무자의 경제적 재기를 돕는 합법적인 제도입니다. 정상적인 직장 생활, 통장 개설, 4대 보험 가입이 모두 가능하며, 직장에 회생/파산 사실이 통보되지 않으므로 안심하셔도 됩니다."
    },
    {
      question: "개인회생 승인까지 시간은 얼마나 걸리나요?",
      answer: "법원의 관할 지역과 사건의 난이도에 따라 다르지만, 통상적으로 신청부터 개시결정까지 3~6개월, 최종 인가결정까지 6개월~1년 정도 소요됩니다. 저희 전담팀은 철저한 서류 준비로 보정명령을 최소화하여 인가 기간을 단축해 드립니다."
    },
    {
      question: "빚 독촉(추심)이 너무 심한데, 어떻게 막을 수 있나요?",
      answer: "개인회생 신청 시 '중지/금지명령'을 함께 신청합니다. 법원에서 금지명령이 내려지면(보통 신청 후 1~2주 이내) 채권자는 더 이상 방문, 전화 독촉, 급여 압류 등의 강제집행을 할 수 없게 되어 일상생활의 평화를 되찾을 수 있습니다."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-lg text-gray-600">
            회생과 파산에 대해 가장 궁금해하시는 질문들을 모았습니다
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <span className="pr-8 font-semibold text-gray-900 text-lg">
                  <span className="text-primary mr-3">Q.</span>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                  <span className="font-bold text-gray-400 mr-3">A.</span>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-xl">
          <p className="text-xl font-bold mb-3">
            더 궁금한 점이 있으신가요?
          </p>
          <p className="text-slate-300 mb-6 font-light">
            지금 바로 김태기 변호사 전담팀에게 당신의 상황을 말씀해 주세요.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold shadow-lg"
          >
            전문가 1:1 무료 상담 신청
          </a>
        </div>
      </div>
    </section>
  );
}