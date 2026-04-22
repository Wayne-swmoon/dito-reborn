import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero";
import { DebtReductionChart } from "./components/debt-reduction-chart";
import { ProcessSteps } from "./components/process-steps";
import { Stats } from "./components/stats";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
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
          /* !important 역할을 하는 스타일 강제 적용 */
          <div className="min-h-screen bg-white pb-24 lg:pb-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", dotum, "돋움", sans-serif' }}>
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