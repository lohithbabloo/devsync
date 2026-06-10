import Onboarding from "../components/OnboardingForm/Onboarding";
import { useContext } from "react";
import Loader from "./Loader";
import LandingPage from "../components/LandingPage/LandingPage";
import DashBoard from "./Dashboard";
import { Contextprovider } from "../contextApi/ContextProvider";
function AuthCallBack() {
  const { user, loading } = useContext(Contextprovider);
  if (loading) {
    return <Loader />;
  }
  if (!user || user === null) {
    return <LandingPage />;
  }
  if (user && !user["userOnboarded"]) {
    return <Onboarding />;
  }

  return <DashBoard />;
}

export default AuthCallBack;
