import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle,
  FileText,
  CreditCard,
  Download,
  AlertCircle,
  TrendingUp,
  Shield,
  Briefcase
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface Question {
  id: string;
  category: string;
  question: string;
  description?: string;
  helpText: string;
  options: {
    value: string;
    label: string;
    points: number;
    description?: string;
  }[];
}

const questions: Question[] = [
  {
    id: "age",
    category: "기본 정보",
    question: "귀하의 연령대는 어떻게 되시나요?",
    helpText: "개인회생은 연령 제한이 없으나, 변제 기간과 계획 수립에 영향을 줄 수 있습니다. 일반적으로 20대~60대가 주 대상입니다.",
    options: [
      { value: "20s-40s", label: "20대 ~ 40대", points: 10 },
      { value: "50s-60s", label: "50대 ~ 60대", points: 8 },
      { value: "70s+", label: "70대 이상", points: 5 },
    ],
  },
  {
    id: "family",
    category: "기본 정보",
    question: "부양가족이 있으신가요?",
    helpText: "부양가족 수는 최저생계비 산정에 중요한 요소입니다. 부양가족이 많을수록 변제금액이 낮아질 수 있습니다.",
    options: [
      { value: "none", label: "없음 (1인 가구)", points: 5 },
      { value: "1-2", label: "1~2명", points: 8 },
      { value: "3+", label: "3명 이상", points: 10 },
    ],
  },
  {
    id: "total_debt",
    category: "채무 상황",
    question: "총 부채 규모는 얼마나 되시나요?",
    helpText: "개인회생은 무담보 채무 10억 원, 담보 채무 15억 원 이하인 경우 신청 가능합니다. 총 부채액은 가장 중요한 판단 기준입니다.",
    options: [
      { value: "under_50m", label: "5천만 원 이하", points: 15 },
      { value: "50m_100m", label: "5천만 원 ~ 1억 원", points: 15 },
      { value: "100m_500m", label: "1억 원 ~ 5억 원", points: 12 },
      { value: "500m_1b", label: "5억 원 ~ 10억 원", points: 10 },
      { value: "over_1b", label: "10억 원 초과", points: 0, description: "개인회생 대상 초과" },
    ],
  },
  {
    id: "debt_type",
    category: "채무 상황",
    question: "주된 채무의 종류는 무엇인가요?",
    helpText: "채무 종류에 따라 변제 우선순위와 방법이 달라집니다. 담보 채무와 무담보 채무는 다르게 처리됩니다.",
    options: [
      { value: "card_loan", label: "신용카드 / 현금서비스", points: 10 },
      { value: "personal_loan", label: "개인대출 (신용대출)", points: 10 },
      { value: "mortgage", label: "주택담보대출", points: 8 },
      { value: "business", label: "사업자금 대출", points: 7 },
      { value: "mixed", label: "여러 종류 혼합", points: 9 },
    ],
  },
  {
    id: "overdue",
    category: "채무 상황",
    question: "채무 연체 기간은 얼마나 되시나요?",
    helpText: "연체 기간이 길수록 신용도가 낮아지지만, 개인회생 신청에는 직접적인 제한이 없습니다. 다만 조기 진행이 유리합니다.",
    options: [
      { value: "none", label: "연체 없음", points: 5 },
      { value: "1-3m", label: "1~3개월", points: 10 },
      { value: "3-6m", label: "3~6개월", points: 12 },
      { value: "over_6m", label: "6개월 이상", points: 15 },
    ],
  },
  {
    id: "income_type",
    category: "소득 정보",
    question: "현재 소득의 형태는 어떻게 되시나요?",
    helpText: "개인회생은 정기적인 소득이 필수입니다. 소득의 안정성과 지속성이 중요한 판단 기준입니다.",
    options: [
      { value: "salary", label: "급여소득 (정규직)", points: 15, description: "가장 안정적" },
      { value: "contract", label: "계약직 / 일용직", points: 12 },
      { value: "business", label: "사업소득 (자영업)", points: 10 },
      { value: "pension", label: "연금 / 임대소득", points: 13 },
      { value: "irregular", label: "불규칙한 소득", points: 5 },
      { value: "none", label: "소득 없음", points: 0, description: "개인회생 어려움" },
    ],
  },
  {
    id: "monthly_income",
    category: "소득 정보",
    question: "월 평균 소득은 얼마인가요?",
    helpText: "소득 금액은 변제 가능 금액을 결정합니다. 최저생계비를 제외한 금액이 변제금으로 책정됩니다.",
    options: [
      { value: "under_150", label: "150만 원 미만", points: 5 },
      { value: "150_250", label: "150만 원 ~ 250만 원", points: 10 },
      { value: "250_350", label: "250만 원 ~ 350만 원", points: 12 },
      { value: "350_500", label: "350만 원 ~ 500만 원", points: 13 },
      { value: "over_500", label: "500만 원 이상", points: 15 },
    ],
  },
  {
    id: "job_stability",
    category: "소득 정보",
    question: "현재 직장(또는 사업)의 근속 기간은?",
    helpText: "근속 기간이 길수록 소득의 안정성이 높다고 판단되어 개인회생 승인에 유리합니다.",
    options: [
      { value: "under_6m", label: "6개월 미만", points: 3 },
      { value: "6m_1y", label: "6개월 ~ 1년", points: 7 },
      { value: "1y_3y", label: "1년 ~ 3년", points: 10 },
      { value: "over_3y", label: "3년 이상", points: 13 },
    ],
  },
  {
    id: "living_cost",
    category: "소득 정보",
    question: "월 평균 생활비(최저생계비)는 얼마나 되시나요?",
    helpText: "생활비를 제외한 금액이 변제금이 됩니다. 생활비가 너무 높으면 변제 능력이 부족하다고 판단될 수 있습니다.",
    options: [
      { value: "under_100", label: "100만 원 이하", points: 15 },
      { value: "100_150", label: "100만 원 ~ 150만 원", points: 12 },
      { value: "150_200", label: "150만 원 ~ 200만 원", points: 10 },
      { value: "over_200", label: "200만 원 이상", points: 7 },
    ],
  },
  {
    id: "real_estate",
    category: "재산 정보",
    question: "보유하고 계신 부동산이 있나요?",
    helpText: "부동산은 청산가치 산정에 포함됩니다. 시세에서 담보대출을 뺀 순자산 가치로 평가됩니다.",
    options: [
      { value: "none", label: "없음", points: 10 },
      { value: "lease", label: "전세 거주", points: 8 },
      { value: "own_debt", label: "주택 소유 (담보대출 有)", points: 7 },
      { value: "own_free", label: "주택 소유 (담보대출 無)", points: 3 },
      { value: "multiple", label: "다주택 소유", points: 0 },
    ],
  },
  {
    id: "vehicle",
    category: "재산 정보",
    question: "차량을 보유하고 계신가요?",
    helpText: "차량 가치도 청산가치에 포함됩니다. 업무용 차량의 경우 일부 인정될 수 있습니다.",
    options: [
      { value: "none", label: "없음", points: 10 },
      { value: "old", label: "10년 이상 중고차", points: 9 },
      { value: "used", label: "일반 중고차 (1천만 원 이하)", points: 7 },
      { value: "new", label: "신차 또는 고가 차량", points: 3 },
    ],
  },
  {
    id: "other_assets",
    category: "재산 정보",
    question: "기타 자산(예금, 주식, 보험 등)이 있나요?",
    helpText: "모든 자산은 청산가치 평가 대상입니다. 보험해지환급금, 퇴직금 등도 포함됩니다.",
    options: [
      { value: "none", label: "거의 없음 (500만 원 이하)", points: 10 },
      { value: "some", label: "일부 있음 (500만 원 ~ 2천만 원)", points: 7 },
      { value: "substantial", label: "상당함 (2천만 원 이상)", points: 3 },
    ],
  },
  {
    id: "bankruptcy_history",
    category: "법적 이력",
    question: "과거 개인회생 또는 파산 신청 이력이 있나요?",
    helpText: "면책 후 5년 이내 재신청은 제한될 수 있습니다. 기각된 경우에도 일정 기간 제한이 있을 수 있습니다.",
    options: [
      { value: "none", label: "없음", points: 15 },
      { value: "over_5y", label: "5년 이상 경과", points: 10 },
      { value: "under_5y", label: "5년 이내", points: 0, description: "재신청 제한 가능" },
    ],
  },
  {
    id: "lawsuit",
    category: "법적 이력",
    question: "현재 진행 중인 소송이나 법적 분쟁이 있나요?",
    helpText: "민사소송, 가압류, 가처분 등이 진행 중이어도 개인회생 신청은 가능하나, 복잡도가 증가할 수 있습니다.",
    options: [
      { value: "none", label: "없음", points: 10 },
      { value: "pending", label: "진행 중", points: 5 },
      { value: "judgment", label: "판결 확정", points: 7 },
    ],
  },
  {
    id: "urgency",
    category: "기타",
    question: "가장 시급한 문제는 무엇인가요?",
    helpText: "귀하의 상황에 가장 적합한 해결 방안을 제시하는 데 참고됩니다.",
    options: [
      { value: "seizure", label: "급여 압류 / 재산 압류", points: 10 },
      { value: "lawsuit", label: "소송 진행 중", points: 9 },
      { value: "overdue", label: "다중 채무 연체", points: 10 },
      { value: "living", label: "생활비 부족", points: 8 },
    ],
  },
];

const categoryIcons: Record<string, any> = {
  "기본 정보": Briefcase,
  "채무 상황": AlertCircle,
  "소득 정보": TrendingUp,
  "재산 정보": Shield,
  "법적 이력": FileText,
  "기타": HelpCircle,
};

export function SelfDiagnosis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setIsPaid(false);
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    questions.forEach((question) => {
      const answer = answers[question.id];
      const maxPoints = Math.max(...question.options.map(opt => opt.points));
      maxScore += maxPoints;
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer);
        if (option) {
          totalScore += option.points;
        }
      }
    });
    return { score: totalScore, maxScore, percentage: Math.round((totalScore / maxScore) * 100) };
  };

  const getDetailedAnalysis = () => {
    const categoryScores: Record<string, { score: number; max: number }> = {};
    
    questions.forEach((question) => {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { score: 0, max: 0 };
      }
      
      const answer = answers[question.id];
      const maxPoints = Math.max(...question.options.map(opt => opt.points));
      categoryScores[question.category].max += maxPoints;
      
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer);
        if (option) {
          categoryScores[question.category].score += option.points;
        }
      }
    });

    return categoryScores;
  };

  const getRecommendations = (percentage: number, categoryScores: Record<string, { score: number; max: number }>) => {
    const recommendations: string[] = [];

    if (percentage >= 75) {
      recommendations.push("개인회생 절차를 즉시 진행하시는 것을 권장합니다.");
      recommendations.push("변호사와 상담하여 필요 서류를 준비하세요.");
      recommendations.push("신청 후 약 4-6개월 내 인가결정을 받을 수 있습니다.");
    } else if (percentage >= 50) {
      recommendations.push("전문가와의 상담을 통해 보완이 필요한 부분을 확인하세요.");
      recommendations.push("소득 안정화나 일부 자산 정리를 고려해보세요.");
      recommendations.push("채무조정이나 워크아웃 등 대안도 검토할 수 있습니다.");
    } else {
      recommendations.push("현재 상황에서는 개인파산이나 다른 채무조정 방법을 고려하세요.");
      recommendations.push("소득이 없다면 개인파산 신청을 검토할 수 있습니다.");
      recommendations.push("금융기관과의 직접 협상을 시도해보는 것도 방법입니다.");
    }

    // 카테고리별 조언
    Object.entries(categoryScores).forEach(([category, data]) => {
      const categoryPercentage = (data.score / data.max) * 100;
      
      if (category === "소득 정보" && categoryPercentage < 50) {
        recommendations.push("소득 안정성 확보가 중요합니다. 부업이나 안정적인 직장 확보를 고려하세요.");
      }
      
      if (category === "채무 상황" && categoryPercentage < 50) {
        recommendations.push("부채 규모가 개인회생 한도를 초과할 수 있습니다. 일부 채무 정리를 우선 고려하세요.");
      }
      
      if (category === "재산 정보" && categoryPercentage < 50) {
        recommendations.push("보유 자산이 많은 경우 청산가치가 높아 불리할 수 있습니다. 자산 구조조정을 검토하세요.");
      }
    });

    return recommendations;
  };

  const handlePayment = () => {
    // 실제로는 결제 API를 호출
    toast.success("결제가 완료되었습니다!");
    setIsPaid(true);
    setShowPayment(false);
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF();
      const { score, maxScore, percentage } = calculateScore();
      const categoryScores = getDetailedAnalysis();
      const recommendations = getRecommendations(percentage, categoryScores);

      // 한글 폰트 문제로 영문으로 표시하거나, 한글이 깨질 수 있음을 알림
      let yPos = 20;

      // 제목
      doc.setFontSize(20);
      doc.text("Personal Recovery Self-Diagnosis Report", 20, yPos);
      yPos += 15;

      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString('ko-KR')}`, 20, yPos);
      yPos += 10;

      // 점수
      doc.setFontSize(14);
      doc.text("Overall Score", 20, yPos);
      yPos += 8;
      doc.setFontSize(12);
      doc.text(`Score: ${score}/${maxScore} (${percentage}%)`, 20, yPos);
      yPos += 15;

      // 카테고리별 분석
      doc.setFontSize(14);
      doc.text("Category Analysis", 20, yPos);
      yPos += 8;
      doc.setFontSize(10);

      Object.entries(categoryScores).forEach(([category, data]) => {
        const catPercentage = Math.round((data.score / data.max) * 100);
        doc.text(`${category}: ${data.score}/${data.max} (${catPercentage}%)`, 25, yPos);
        yPos += 6;
      });

      yPos += 10;

      // 권장사항
      doc.setFontSize(14);
      doc.text("Recommendations", 20, yPos);
      yPos += 8;
      doc.setFontSize(10);

      recommendations.forEach((rec, index) => {
        const lines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
        lines.forEach((line: string) => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });

      yPos += 10;
      doc.setFontSize(8);
      doc.text("* This is for reference only. Please consult with an expert.", 20, yPos);

      doc.save("personal-recovery-diagnosis.pdf");
      toast.success("PDF 리포트가 다운로드되었습니다!");
    } catch (error) {
      toast.error("PDF 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion?.id];
  const { score, maxScore, percentage } = calculateScore();
  const categoryScores = getDetailedAnalysis();
  const recommendations = getRecommendations(percentage, categoryScores);

  const getResultLevel = (percentage: number) => {
    if (percentage >= 75) {
      return {
        status: "high",
        title: "개인회생 신청 가능성 높음",
        description:
          "현재 상황으로 보아 개인회생 절차를 진행하실 수 있는 조건을 충족하고 계십니다.",
        icon: CheckCircle2,
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary",
      };
    } else if (percentage >= 50) {
      return {
        status: "medium",
        title: "전문가 상담 필요",
        description:
          "개인회생 신청이 가능할 수 있으나, 일부 조건에 대한 추가 검토가 필요합니다.",
        icon: AlertCircle,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-300",
      };
    } else {
      return {
        status: "low",
        title: "다른 해결 방법 권장",
        description:
          "현재 상황에서는 개인회생보다 다른 채무 조정 방법이 더 적합할 수 있습니다.",
        icon: XCircle,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      };
    }
  };

  const result = getResultLevel(percentage);
  const ResultIcon = result.icon;
  const CategoryIcon = categoryIcons[currentQuestion?.category] || HelpCircle;

  const scrollToContact = () => {
    const contactForm = document.getElementById("contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="diagnosis">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              전문가급 진단 시스템
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              개인회생 정밀 자가진단
            </h2>
            <p className="text-xl text-gray-600">
              15개의 상세 질문으로 정확한 진단과 맞춤형 해결방안을 제시합니다
            </p>
          </div>

          <Card className="shadow-xl border-2">
            {!showResult ? (
              <>
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4" />
                        <span className="font-medium">{currentQuestion.category}</span>
                      </div>
                      <span className="font-semibold">
                        {currentStep + 1} / {questions.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  <div className="flex items-start gap-3">
                    <CardTitle className="text-2xl flex-1">{currentQuestion.question}</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <HelpCircle className="h-5 w-5 text-primary" />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p className="text-sm">{currentQuestion.helpText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {currentQuestion.description && (
                    <CardDescription className="text-base mt-2">
                      {currentQuestion.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <RadioGroup
                    value={currentAnswer}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <div
                          key={option.value}
                          className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            currentAnswer === option.value
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                          }`}
                          onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        >
                          <RadioGroupItem 
                            value={option.value} 
                            id={option.value} 
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={option.value}
                              className="cursor-pointer text-base font-medium block"
                            >
                              {option.label}
                            </Label>
                            {option.description && (
                              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      이전
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!currentAnswer}
                      className="gap-2 bg-primary hover:bg-primary/90 text-white"
                    >
                      {currentStep === questions.length - 1 ? "진단 완료" : "다음"}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="py-12">
                {/* 진단 결과 헤더 */}
                <div className={`${result.bgColor} border-2 ${result.borderColor} rounded-xl p-8 mb-8`}>
                  <div className="flex items-start gap-4">
                    <ResultIcon className={`h-16 w-16 ${result.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        {result.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary" className="text-base px-4 py-2">
                          총점: {score}/{maxScore}점
                        </Badge>
                        <Badge variant="secondary" className="text-base px-4 py-2">
                          적합도: {percentage}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 카테고리별 분석 */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    카테고리별 상세 분석
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(categoryScores).map(([category, data]) => {
                      const catPercentage = Math.round((data.score / data.max) * 100);
                      const Icon = categoryIcons[category];
                      return (
                        <Card key={category} className="border-2">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">{category}</span>
                              </div>
                              <span className="text-sm font-semibold">{catPercentage}%</span>
                            </div>
                            <Progress value={catPercentage} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              {data.score}/{data.max}점
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* 맞춤형 권장사항 */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    맞춤형 해결 방안
                  </h4>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-100">
                    <ul className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* PDF 리포트 안내 */}
                {/*}
                {!isPaid && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-4">
                      <FileText className="h-12 w-12 text-purple-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          상세 PDF 리포트 제공
                        </h4>
                        <p className="text-gray-700 mb-4">
                          진단 결과를 전문가가 작성한 준의 상세 PDF 리포트로 받아보세요. 
                          변호사 상담 시 유용하게 활용하실 수 있습니다.
                        </p>
                        <ul className="text-sm text-gray-600 mb-4 space-y-1">
                          <li>✓ 15페이지 이상의 상세 분석 리포트</li>
                          <li>✓ 단계별 실행 가이드 포함</li>
                          <li>✓ 필요 서류 체크리스트 제공</li>
                          <li>✓ 변호사 상담 시 활용 가능</li>
                        </ul>
                        <div className="flex items-center gap-3">
                          <Button 
                            onClick={() => setShowPayment(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2"
                          >
                            <CreditCard className="h-4 w-4" />
                            9,900원에 리포트 받기
                          </Button>
                          <span className="text-sm text-gray-500">
                            원가 49,000원 → <span className="font-semibold text-purple-600">80% 할인</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                */}
                {/* 기본 정보 요약 */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
                  <h4 className="font-semibold text-gray-900 mb-3">📊 진단 결과 요약</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">총 문항</p>
                      <p className="font-semibold text-lg">{questions.length}개</p>
                    </div>
                    <div>
                      <p className="text-gray-500">응답 완료</p>
                      <p className="font-semibold text-lg">{Object.keys(answers).length}개</p>
                    </div>
                    <div>
                      <p className="text-gray-500">총점</p>
                      <p className="font-semibold text-lg">{score}점</p>
                    </div>
                    <div>
                      <p className="text-gray-500">적합도</p>
                      <p className="font-semibold text-lg">{percentage}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    ※ 본 자가진단은 참고용이며, 정확한 판단은 전문가 상담이 필요합니다.
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="flex-1"
                  >
                    다시 진단하기
                  </Button>
                  {isPaid && (
                    <Button
                      onClick={generatePDF}
                      disabled={isGeneratingPDF}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {isGeneratingPDF ? "생성 중..." : "PDF 다운로드"}
                    </Button>
                  )}
                  <Button
                    onClick={scrollToContact}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    무료 전문가 상담 신청
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              💡 정확한 개인회생 가능 여부는 전문 변호사와의 상담을 통해 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 결제 다이얼로그 */}
      {/*
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>PDF 리포트 결제</DialogTitle>
            <DialogDescription>
              상세 진단 리포트를 9,900원에 제공합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">개인회생 정밀 진단 리포트</span>
                <span className="font-semibold">9,900원</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">최종 결제금액</span>
                <span className="text-xl font-bold text-primary">9,900원</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">포함 내용</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ 카테고리별 상세 분석 (15페이지 이상)</li>
                <li>✓ 맞춤형 실행 계획</li>
                <li>✓ 필요 서류 체크리스트</li>
                <li>✓ 예상 변제금액 시뮬레이션</li>
                <li>✓ 변호사 상담 준비 가이드</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                * 본 서비스는 데모 버전입니다. 실제 결제는 진행되지 않습니다.
              </p>
              <Button
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold gap-2"
              >
                <CreditCard className="h-4 w-4" />
                결제하기 (데모)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      */}
    </section>
  );
}