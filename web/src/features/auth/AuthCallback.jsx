import { useContext } from "react";
import Loader from "../../common/Loader";
import LandingPage from "./LandingPage";
import Onboarding from "./Onboarding";
import Dashboard from "../dashboard/Dashboard";
import { Contextprovider } from "../../contextApi/ContextProvider";

function AuthCallback() {
  const { user, loading } = useContext(Contextprovider);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <LandingPage />;
  }

  if (user && !user.userOnboarded) {
    return <Onboarding />;
  }

  return <Dashboard />;
}

export default AuthCallback;
