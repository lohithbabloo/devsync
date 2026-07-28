import Button from "../../common/Button";

function LandingPage() {
  function handleGetStarted() {
    // keep simple: redirect to app root or trigger auth
    window.location.href = "http://localhost:3000";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8 text-slate-100">
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">
        Welcome to DevSync
      </h1>
      <p className="mb-6 max-w-md text-center text-sm text-slate-400">
        DevSync helps you visualise repository commits and analytics.
      </p>
      <Button variant="primary" onClick={handleGetStarted}>
        Get started
      </Button>
    </main>
  );
}

export default LandingPage;
