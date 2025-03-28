import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { AuthContextInterface } from "../context/AuthContext/AuthContextInterface";

const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
