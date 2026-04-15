import { Hero } from "./components/hero";
import { ProcessSteps } from "./components/process-steps";
import { Stats } from "./components/stats";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
import { ContactForm } from "./components/contact-form";
import { Footer } from "./components/footer";
import { SelfDiagnosis } from "./components/self-diagnosis";

export default function App() {
  return (
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
  );
}