import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero";
import { ProcessSteps } from "./components/process-steps";
import { Stats } from "./components/stats";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
import { ContactForm } from "./components/contact-form";
import { Footer } from "./components/footer";
import { SelfDiagnosis } from "./components/self-diagnosis";

// 경로 주의! 아까 성공했던 그 경로 그대로 써줘.
import PreviewPage from "../pages/PreviewPage"; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 주소 (/) : 메인 홈페이지 */}
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Hero />
            <Stats />
            <SelfDiagnosis />
            <ProcessSteps />
            <Features />
            <Testimonials />
            <FAQ />
            <ContactForm />
            <Footer />
          </div>
        } />

        {/* 리포트 확인 주소 (/preview) : 지금 작업 중인 리포트 화면 */}
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}