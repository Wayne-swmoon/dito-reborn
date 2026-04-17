import { Phone, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

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

  // 전송 중 상태를 관리하는 변수 (버튼 중복 클릭 방지)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // 버튼을 '접수 중...' 상태로 변경

    try {
      // 1. Firebase 데이터베이스에 저장
      await addDoc(collection(db, "consultations"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      // 2. EmailJS로 관리자에게 이메일 발송
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
      
      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        email: "",
        debtAmount: "",
        message: ""
      });
    } catch (error) {
      console.error("접수 중 오류 발생:", error);
      alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false); // 전송이 끝나면 다시 버튼 활성화
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
            지금 바로 신청하시면 24시간 내 전문가가 연락드립니다
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
                    <div className="text-2xl text-primary font-semibold">0507-1342-5755</div>
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
                    <div className="mb-1">카카오톡 상담</div>
                    <div className="text-primary">@개인회생상담</div>
                    <div className="text-sm text-gray-400 mt-1">실시간 채팅 상담</div>
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
                <label htmlFor="name" className="block text-sm mb-2">
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
                <label htmlFor="phone" className="block text-sm mb-2">
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
                <label htmlFor="email" className="block text-sm mb-2">
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
                <label htmlFor="debtAmount" className="block text-sm mb-2">
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
                <label htmlFor="message" className="block text-sm mb-2">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors shadow-lg"
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