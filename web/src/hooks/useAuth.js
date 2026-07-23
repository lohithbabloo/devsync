import { useContext } from "react";
import { Contextprovider } from "../contextApi/ContextProvider";

export function useAuth() {
  return useContext(Contextprovider);
}
