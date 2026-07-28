import { useContext, useState } from "react";
import { toast } from "sonner";
import baseUrl from "../../app/ApiClient";
import { Contextprovider } from "../../contextApi/ContextProvider";
import Button from "../../common/Button";

function Onboarding() {
  const { user, setUser } = useContext(Contextprovider);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function saveDetails(e) {
    e.preventDefault();
    if (isSaving) return;

    const postBody = {
      githubUserName: user?.githubUserName,
      userName,
      email,
    };

    setIsSaving(true);
    try {
      const response = await baseUrl.post("/api/v1/user", postBody);
      setUser(response.data || { ...user, userOnboarded: true });
      toast.success("Profile saved");
    } catch (error) {
      console.error("Failed to save onboarding details", error);
      toast.error("Failed to save your details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-slate-100">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-xl font-semibold">Welcome to DevSync</p>
        <form onSubmit={saveDetails} className="space-y-4">
          <div>
            <label htmlFor="userName" className="mb-1 block text-sm">
              Username
            </label>
            <input
              id="userName"
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSaving}
            className="w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Onboarding;
