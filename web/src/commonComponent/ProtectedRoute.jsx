import { useContext } from "react";
import { Contextprovider } from "../contextApi/ContextProvider";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(Contextprovider);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  console.log("ProtectedRoute", {
    loading,
    user,
    path: window.location.pathname,
  });
  return children;
}
export default ProtectedRoute;
