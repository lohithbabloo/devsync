import { useEffect, useState } from "react";
import { Contextprovider } from "./ContextProvider";
import baseUrl from "../commonComponent/ApiClient";
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogin = async () => {
    try {
      const response = await baseUrl.get("api/v1/user/me");
      setUser(response.data);
    } catch (e) {}
    // console.log(response);
    setLoading(false);
  };

  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <Contextprovider.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </Contextprovider.Provider>
  );
}
export default UserContextProvider;
