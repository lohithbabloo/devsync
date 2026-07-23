import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { Contextprovider } from "../contextApi/ContextProvider";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(Contextprovider);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
