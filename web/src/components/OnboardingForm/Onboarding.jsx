import { useContext, useState } from "react";
import baseUrl from "../../commonComponent/ApiClient";
import { Contextprovider } from "../../contextApi/ContextProvider";

function Onboarding() {
  const { user } = useContext(Contextprovider);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  console.log(user);
  console.log("oboarding");
  async function saveDetails(e) {
    e.preventDefault();
    const postbody = {
      githubUserName: user.githubUserName,
      userName: userName,
      email: email,
    };
    console.log(postbody);
    const response = await baseUrl.post("/api/v1/user", postbody);
    console.log(response);
  }
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <p>Welcome to DevSync</p>
      <form onSubmit={saveDetails}>
        <label>Username</label>
        <input
          type="text"
          className="text-black"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
        <label>Email address</label>
        <input
          type="email"
          className="text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input type="submit" />
      </form>
    </main>
  );
}

export default Onboarding;
