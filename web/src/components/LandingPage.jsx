import baseUrl from "../commonComponent/ApiClient";
import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";

function LandingPage() {
  async function handleGetStarted() {
    const response = await baseUrl.get("api/v1/user/me");
    console.log(response);
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
