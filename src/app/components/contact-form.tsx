import { Phone, Mail, MessageSquare, User } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    debtAmount: "",
    message: ""
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
      await addDoc(collection(db, "consultations"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          debt_amount: formData.debtAmount,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("상담 신청이 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다!");
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        debtAmount: "",
        message: ""
      });
      setAgreed(false);
      
    } catch (error) {
      console.error("접수 중 오류 발생:", error);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#1f2833] via-[#2d3a42] to-[#1a2128] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            무료 상담 신청
          </h2>
          <p className="text-lg text-gray-300">
            당신의 삶을 바꾸세요!
          </p>
          <p className="text-lg text-gray-300">
            지금 바로 신청하시면 24시간 내 전문가가 직접 연락드립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6">
                상담 안내
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="mb-1">전화 상담</div>
                    <div className="text-2xl text-primary font-semibold"><a href="tel:070-8064-6525">070-8064-6525</a></div>
                    <div className="text-sm text-gray-400 mt-1">평일 09:00 - 18:00 (주말, 공휴일 휴무)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="mb-1">이메일 상담</div>
                    <div className="text-primary">sinegienter@gmail.com</div>
                    <div className="text-sm text-gray-400 mt-1">24시간 접수 가능</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="mb-1">출장 상담서비스 안내</div>
                    <div className="text-primary">원하는 곳까지 직접 찾아가는 서비스</div>
                    <div className="text-sm text-gray-400 mt-1">출장비용 발생. 상담 시 협의</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <h4 className="mb-4">상담 시 준비사항</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 현재 채무 총액 (대략적인 금액)</li>
                <li>• 월 소득 및 지출 내역</li>
                <li>• 주요 채권자 정보 (은행, 카드사 등)</li>
                <li>• 기타 재산 현황 (부동산, 차량 등)</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                ※ 정확한 정보를 제공해주시면 더 정확한 상담이 가능합니다
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="홍길동"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="debtAmount" className="block text-sm font-bold mb-2">
                  현재 채무 총액 (선택)
                </label>
                <select
                  id="debtAmount"
                  name="debtAmount"
                  value={formData.debtAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">선택하세요</option>
                  <option value="1000-3000">1천만원 ~ 3천만원</option>
                  <option value="3000-5000">3천만원 ~ 5천만원</option>
                  <option value="5000-7000">5천만원 ~ 7천만원</option>
                  <option value="7000-10000">7천만원 ~ 1억원</option>
                  <option value="10000+">1억원 이상</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2">
                  상담 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="상담받고 싶은 내용을 자유롭게 작성주세요"
                />
              </div>

              {/* 개인정보 동의 영역 */}
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={agreed} 
                    onCheckedChange={(v) => setAgreed(v as boolean)} 
                    className="w-5 h-5 border-2 border-gray-400 data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="terms" className="text-sm font-bold text-gray-800 cursor-pointer select-none">
                    개인정보 수집 및 이용 동의 <span className="text-primary">(필수)</span>
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
                    {/* 스크롤이 확실하게 동작하도록 고정 높이 h-[400px]와 w-full 부여 */}
                    <ScrollArea className="h-[400px] w-full pr-4 text-[13px] leading-relaxed text-gray-600 mt-2">
                      <div className="space-y-6 pb-6">
                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">수집하는 개인정보 항목</h4>
                          <p>변호사 김태기 법률사무소 개인회생 전문센터는(은) 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            <li><strong>필수항목 :</strong> 이름, 연락처, 이메일</li>
                            <li><strong>자동수집항목 :</strong> 서비스 이용기록, 방문로그, 쿠키, 방문IP정보</li>
                          </ul>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보의 수집 및 이용목적</h4>
                          <p>수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                          <ol className="list-decimal ml-4 mt-1 space-y-1">
                            <li>서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인</li>
                            <li>고지사항 전달, 의사소통 경로 확보, 이벤트 당첨 물품 배송 시 정확한 배송지 정보 확보</li>
                            <li>신규 서비스 등 최신정보 개인 맞춤 서비스 제공을 위한 자료</li>
                            <li>불량회원 부정 이용 방지 및 비인가 사용 방지</li>
                            <li>기타 원활한 양질의 서비스 제공</li>
                          </ol>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보의 보유 및 이용기간</h4>
                          <p>원칙적으로 개인정보의 수집 또는 제공받은 목적 달성 시 지체 없이 파기합니다.</p>
                          <p className="mt-1">회원으로서 서비스를 이용하는 동안 회원님의 개인정보는 계속 보유하게 되나 원칙적으로 수집 또는 제공받은 목적 달성 시 지체 없이 파기합니다. 이용약관 및 미풍양속을 해치는 등 서비스에 물의를 일으키는 경우, 불량사용자에 대해서는 이용자의 의사에 관계없이 강제탈퇴됩니다.</p>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보의 파기절차 및 방법</h4>
                          <p>목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            <li><strong>파기절차 :</strong> 입력하신 정보는 목적이 달성된 후 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 파기됩니다.</li>
                            <li><strong>파기방법 :</strong> 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                          </ul>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">제3자 제공에 관한 사항</h4>
                          <p>이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            <li>이용자들이 사전에 동의한 경우</li>
                            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                          </ul>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">수집한 개인정보의 위탁</h4>
                          <p>고객님의 동의없이 고객님의 정보를 외부 업체에 위탁하지 않습니다. 향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다.</p>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">이용자 및 법정대리인의 권리와 그 행사방법</h4>
                          <p>이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다. 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.</p>
                        </section>

                        <section>
                          <h4 className="font-bold text-gray-900 mb-2">개인정보 보호책임자</h4>
                          <div className="bg-gray-100 p-3 rounded-lg space-y-1">
                            <p><strong>성명 :</strong> 김주휘 사무장</p>
                            <p><strong>전화번호 :</strong> 070-8064-6525 (평일 : 오전 9:00 ~ 오후 6:00)</p>
                            <p><strong>이메일 :</strong> sinegienter@gmail.com</p>
                          </div>
                        </section>

                        <section className="text-xs text-gray-400">
                          <p>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
                          <ul className="mt-1">
                            <li>1. 개인정보침해신고센터 (118, http://privacy.kisa.or.kr)</li>
                            <li>2. 개인정보분쟁조정위원회 (1833-6972, http://www.kopico.go.kr)</li>
                            <li>3.대검찰청 사이버수사과 (전화 1301, http://www.spo.go.kr/)</li>
                            <li>4.경찰청 사이버안전국 (전화 182, http://cyberbureau.police.go.kr/)</li>
                          </ul>
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
                className={`w-full py-4 text-white font-bold rounded-lg transition-colors shadow-lg ${
                  agreed && !isSubmitting ? "bg-primary hover:bg-primary/90" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "접수 중..." : "무료 상담 신청하기"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                개인정보는 상담 목적으로만 사용되며, 관련 법령에 따라 안전하게 관리됩니다
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}