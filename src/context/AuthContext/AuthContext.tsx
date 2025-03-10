import { createContext, useEffect, useState } from "react";
import { AuthContextInterface } from "./AuthContextInterface";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { listenToAccount } from "../../controllers/account";
import { AccountType } from "../../types/account_type";

export const AuthContext = createContext<AuthContextInterface | null>(null);
const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Auth States
  const [userCredential, setUserCredential] = useState<User | null | undefined>(
    undefined
  );
  const [accountDetail, setAccountDetail] = useState<{} | null>(null);

  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Auth Methods
  const signup = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const login = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const signout = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  // When component mounts, listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserCredential(user || null); // Set to `null` if user is not authenticated
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  //Route to different pages when user state changes
  useEffect(() => {
    if (userCredential === null) {
      navigate(routes.auth.base);
      setIsAuthLoading(false);
    } else if (userCredential === undefined) {
      setIsAuthLoading(true);
    } else {
      setIsAuthLoading(false);
    }
  }, [userCredential, location]);

  // Fill in the total data from the account when auth state changes
  useEffect(() => {
    if (!userCredential) return setAccountDetail(null);
    listenToAccount(userCredential.uid, (account: AccountType) => {
      setAccountDetail(account);
    });
  }, [userCredential]);

  return (
    <AuthContext.Provider
      value={{ signup, signout, login, userCredential, accountDetail }}
    >
      {children}
      <LoadingScreen isVisible={isAuthLoading} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
