import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero";
import { DebtReductionChart } from "./components/debt-reduction-chart";
import { ProcessSteps } from "./components/process-steps";
import { Stats } from "./components/stats";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
// ✨ 1. 프로필 섹션 불러오기
import { ProfileSection } from "./components/profile";
import { ContactForm } from "./components/contact-form";
import { Footer } from "./components/footer";
import { SelfDiagnosis } from "./components/self-diagnosis";
import { ComparisonSection } from "./components/comparison-section";
import { MobileSpecialFeature } from "./components/mobile-special-feature";
import { MobileStickyActions } from "./components/mobile-sticky-actions";

import PreviewPage from "../pages/PreviewPage"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          /* [UI 컬러 적용 및 폰트 가독성 최적화] 
             1. bg-[#fffffb]: 메인 배경색을 따뜻한 아이보리로 변경
             2. text-[#1e1423]: 기본 글자색을 다크 퍼플/블랙으로 변경하여 가독성 및 고급스러움 확보 
             3. 옛날 하드코딩 폰트를 지우고 tracking-tight, wordBreak 적용
          */
          <div className="min-h-screen bg-[#fffffb] text-[#1e1423] pb-24 lg:pb-0 tracking-tight" style={{ wordBreak: 'keep-all' }}>
            <Hero />
            <DebtReductionChart />
            <Stats />

            <div className="hidden lg:block">
              <ComparisonSection />
            </div>
            <div className="block lg:hidden">
              <MobileSpecialFeature />
            </div>

            <SelfDiagnosis />
            <ProcessSteps />
            <Features />
            <Testimonials />
            <FAQ />
            
            {/* ✨ 2. 상담 신청 직전에 신뢰도 끌어올리는 프로필 섹션 배치! */}
            <ProfileSection />
            
            {/* 버튼 클릭 시 이 위치로 오게 함 */}
            <section id="contact">
              <ContactForm />
            </section>
            
            <Footer />
            <MobileStickyActions />
          </div>
        } />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}