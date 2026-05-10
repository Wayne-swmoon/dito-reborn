import { Phone, Mail, MessageSquare, User, Send } from "lucide-react";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// Firebase 설정 (환경 변수 사용)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function ContactForm() {
  // ✨ 불필요한 필드 제거 (이름, 연락처만 남김)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Firebase 데이터 저장 (간편 폼 데이터만 저장)
      await addDoc(collection(db, "consultations"), {
        ...formData,
        type: "간편신청", // 간편 신청임을 명시
        createdAt: serverTimestamp(),
      });

      // 2. EmailJS 메일 발송
      // 기존 템플릿 변수가 비어있어서 오류나는 것을 막기 위해 기본값 세팅
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          phone: formData.phone,
          email: "미입력(간편신청)",
          debt_amount: "미입력(간편신청)",
          message: "이름과 연락처만 남긴 간편 상담 신청 고객입니다. 빠르게 연락해 주세요!",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 3. GA4 상담 신청 완료 이벤트 발송
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "consultation_submit", {
          event_category: "consultation",
          event_label: "무료상담신청_간편폼",
          value: 1
        });
      }

      alert("상담 신청이 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다!");
      
      setFormData({
        name: "",
        phone: "",
      });
      setAgreed(false);
      
    } catch (error) {
      console.error("접수 중 오류 발생:", error);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "phone_call_click", {
        event_category: "contact",
        event_label: "전화상담버튼"
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#1f2833] via-[#2d3a42] to-[#1a2128] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 font-bold">
            무료 상담 신청
          </h2>
          <p className="text-lg text-emerald-400 font-medium mt-2">
            지금 번호만 남기시면 24시간 내 전문가가 직접 연락드립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info (왼쪽 영역 유지) */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6 font-semibold">
                상담 안내
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="mb-1 text-gray-300">전화 상담</div>
                    <div className="text-2xl text-white font-bold hover:text-emerald-400 transition-colors">
                      <a href="tel:070-8064-6525" onClick={handlePhoneClick}>070-8064-6525</a>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">평일 09:00 - 18:00 (주말, 공휴일 휴무)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="mb-1 text-gray-300">출장 상담서비스 안내</div>
                    <div className="text-white font-medium">원하는 곳까지 직접 찾아가는 서비스</div>
                    <div className="text-sm text-gray-400 mt-1">출장비용 발생. 상담 시 협의</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
              <h4 className="mb-3 font-bold text-emerald-400 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                실시간 무료상담 대기 중
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                복잡한 서류 준비는 나중에 하셔도 괜찮습니다.<br/>
                가장 급한 <strong className="text-white">추심 방어</strong>와 <strong className="text-white">탕감 가능액</strong>,<br/>
                지금 번호만 남겨주시면 담당 사무장이 직접 전화드리겠습니다.
              </p>
            </div>
          </div>

          {/* Contact Form (오른쪽: 초간편 입력 폼) */}
          <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. 이름 입력 */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-800">
                  이름 <span className="text-red-500">*</span>
                  <span className="text-xs font-normal text-gray-500 ml-2">(가명으로도 상담 가능합니다)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                    placeholder="홍길동"
                  />
                </div>
              </div>

              {/* 2. 연락처 입력 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold mb-2 text-gray-800">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              {/* 3. 개인정보 동의 (기존 코드 유지) */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between mt-8">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={agreed} 
                    onCheckedChange={(v) => setAgreed(v as boolean)} 
                    className="w-5 h-5 border-2 border-gray-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                  />
                  <Label htmlFor="terms" className="text-sm font-bold text-gray-800 cursor-pointer select-none">
                    개인정보 수집 및 이용 동의 <span className="text-emerald-600">(필수)</span>
                  </Label>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="h-auto p-0 text-xs text-gray-500 underline underline-offset-2 font-medium">
                      내용보기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[500px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-bold text-xl text-gray-900 border-b pb-4">개인정보 처리방침</DialogTitle>
                    </DialogHeader>
                    {/* 약관 내용은 기존과 동일하므로 생략 없이 원본 유지 */}
                    <ScrollArea className="h-[400px] w-full pr-4 text-[13px] leading-relaxed text-gray-600 mt-2">
                      <div className="space-y-6 pb-6">
                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">수집하는 개인정보 항목</h4>
                          <p>변호사 김태기 법률사무소 개인회생 전문센터는(은) 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            <li><strong>필수항목 :</strong> 이름, 연락처</li>
                            <li><strong>자동수집항목 :</strong> 서비스 이용기록, 방문로그, 쿠키, 방문IP정보</li>
                          </ul>
                        </section>
                        {/* 이하 기존 약관 내용과 동일 */}
                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보의 수집 및 이용목적</h4>
                          <p>수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                          <ol className="list-decimal ml-4 mt-1 space-y-1">
                            <li>서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인</li>
                            <li>고지사항 전달, 의사소통 경로 확보</li>
                            <li>불량회원 부정 이용 방지 및 비인가 사용 방지</li>
                          </ol>
                        </section>
                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보 보호책임자</h4>
                          <div className="bg-gray-100 p-3 rounded-lg space-y-1">
                            <p><strong>성명 :</strong> 김주휘 사무장</p>
                            <p><strong>전화번호 :</strong> 070-8064-6525 (평일 : 오전 9:00 ~ 오후 6:00)</p>
                            <p><strong>이메일 :</strong> helprebornmylife@gmail.com</p>
                          </div>
                        </section>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting || !agreed}
                className={`w-full py-5 text-white font-black text-lg rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 ${
                  agreed && !isSubmitting 
                    ? "bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-1" 
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "접수 중..." : (
                  <>
                    <Send className="w-5 h-5" />
                    빠른 무료 상담 신청하기
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}