import Button from "../../common/Button";

function LandingPage() {
  function handleGetStarted() {
    // keep simple: redirect to app root or trigger auth
    window.location.href = "http://localhost:3000";
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome to DevSync</h1>
      <p className="mb-6 max-w-xl text-center text-slate-300">
        DevSync helps you visualise repository commits and analytics.
      </p>
      <div className="flex gap-3">
        <Button onClick={handleGetStarted}>Get started</Button>
      </div>
    </main>
  );
}

export default LandingPage;
