import baseUrl from "../../commonComponent/ApiClient";
import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";

function LandingPage() {
  // const navigate = useNavigate();
  async function handleGetStarted() {
    try {
      window.location.href = "http://localhost:3000";
    } catch (error) {}
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </main>
  );
}

export default LandingPage;
