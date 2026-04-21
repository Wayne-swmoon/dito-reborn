import { Scale, ShieldCheck, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function ComparisonSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 영역 */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4 px-4 py-1 text-sm font-semibold border-none">
            나에게 맞는 제도는?
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            개인회생 <span className="text-slate-400 font-light mx-2">vs</span> 개인파산
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            두 제도 모두 법원이 주관하는 합법적인 빚 탕감 제도입니다.
            현재의 소득과 재산 상황에 따라 가장 유리한 제도를 선택해야 합니다.
          </p>
        </div>

        {/* 핵심 요약 카드 영역 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 relative">
          {/* VS 뱃지 (데스크톱에서 가운데 표시) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg z-10 font-bold text-slate-400 border border-slate-100">
            VS
          </div>

          {/* 개인회생 카드 */}
          <Card className="border-2 border-emerald-500 shadow-lg shadow-emerald-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold shadow-sm">
              재산 보호형
            </div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">개인회생</h3>
              <p className="text-emerald-600 font-semibold mb-6">
                "안정적인 수입이 있고, 내 재산을 지키고 싶다면"
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>매월 생계비를 제외한 금액으로 <strong>3~5년간 분할 상환</strong></span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>집, 자동차 등 <strong>본인 명의 재산 유지 가능</strong></span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>남은 원금 및 이자 전액 탕감</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 개인파산 카드 */}
          <Card className="border-2 border-blue-500 shadow-lg shadow-blue-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold shadow-sm">
              전액 면책형
            </div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Scale className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">개인파산</h3>
              <p className="text-blue-600 font-semibold mb-6">
                "소득이 최저생계비 미만이고, 갚을 능력이 도저히 없다면"
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>분할 상환 절차 없이 <strong>즉시 채무 전액(100%) 탕감</strong></span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>원칙적으로 <strong>보유 재산은 처분</strong>하여 채권자에게 배당</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>채무 한도 제한 없음</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 상세 비교표 영역 (모바일 반응형) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-900 w-1/4 min-w-[120px]">비교 항목</th>
                  <th className="p-4 font-bold text-emerald-700 w-3/8 min-w-[200px]">개인회생</th>
                  <th className="p-4 font-bold text-blue-700 w-3/8 min-w-[200px]">개인파산</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30">소득 요건</td>
                  <td className="p-4 text-slate-600">지속적이고 반복적인 소득 필수<br/><span className="text-xs text-slate-400">(급여, 사업, 연금 등)</span></td>
                  <td className="p-4 text-slate-600">소득이 없거나 최저생계비 미만</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30">채무 한도</td>
                  <td className="p-4 text-slate-600">무담보 10억 / 담보 15억 이하</td>
                  <td className="p-4 text-slate-600 font-medium text-blue-600">제한 없음</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30">재산 처리</td>
                  <td className="p-4 text-slate-600">
                    <span className="font-medium text-emerald-600">재산 보유 가능</span>
                    <br/>
                    <span className="text-xs text-slate-500">※ 청산가치 보장 원칙: 재산 가치보다 많이 변제해야 함</span>
                  </td>
                  <td className="p-4 text-slate-600">원칙적으로 재산 처분 및 배당 필수</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30">변제 방식</td>
                  <td className="p-4 text-slate-600">3년 ~ 5년 동안 원금 일부 변제</td>
                  <td className="p-4 text-slate-600">변제 절차 없이 재산 배당 후 면책</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30">신용 회복</td>
                  <td className="p-4 text-slate-600">1년 성실 상환 시 공공정보 조기 삭제 가능</td>
                  <td className="p-4 text-slate-600">면책 결정 시 공공정보 삭제</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 전문가 팁 박스 */}
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-xl shadow-slate-900/10">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1">리본마이라이프의 전문가 Tip</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              최근 법원 실무에서는 <strong className="text-emerald-400">개인회생 신용 회복 혜택(1년 성실 상환 시 공공정보 조기 삭제)</strong>을 대폭 지원하고 있습니다. 
              반면, 개인파산은 면책 불허가 사유(재산 은닉, 도박 등)를 엄격하게 심사합니다. 자가진단을 통해 본인에게 유리한 제도를 먼저 확인해 보세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}