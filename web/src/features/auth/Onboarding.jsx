import { useContext, useState } from "react";
import baseUrl from "../../app/ApiClient";
import { Contextprovider } from "../../contextApi/ContextProvider";

function Onboarding() {
  const { user } = useContext(Contextprovider);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  async function saveDetails(e) {
    e.preventDefault();

    const postBody = {
      githubUserName: user?.githubUserName,
      userName,
      email,
    };

    try {
      await baseUrl.post("/api/v1/user", postBody);
    } catch (error) {
      console.error("Failed to save onboarding details", error);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <p className="mb-4 text-xl">Welcome to DevSync</p>
      <form onSubmit={saveDetails} className="space-y-4">
        <div>
          <label className="mb-1 block">Username</label>
          <input
            type="text"
            className="w-full rounded px-3 py-2 text-black"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div>
          <label className="mb-1 block">Email address</label>
          <input
            type="email"
            className="w-full rounded px-3 py-2 text-black"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-white px-4 py-2 text-slate-950"
        >
          Save
        </button>
      </form>
    </main>
  );
}

export default Onboarding;
