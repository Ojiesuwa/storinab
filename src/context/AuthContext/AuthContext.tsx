import { createContext, useEffect, useState } from "react";
import { AuthContextInterface } from "./AuthContextInterface";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useLocation } from "react-router-dom";

import {
  createNewAccount,
  doesAccountExist,
  listenToAccount,
} from "../../controllers/account";
import { AccountType } from "../../types/account_type";
import { authBasedRoute } from "../../constants/authBasedRoutes";
import AuthScreen from "../../components/AuthScreen/AuthScreen";
import { toast } from "react-toastify";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

export const AuthContext = createContext<AuthContextInterface | null>(null);
const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  // Hooks
  const location = useLocation();

  // Auth States
  const [userCredential, setUserCredential] = useState<User | null | undefined>(
    undefined
  );
  const [accountDetail, setAccountDetail] = useState<AccountType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  // AUth Methods

  const continueWithGoogle = async () => {
    try {
      setIsAuthLoading(true);
      // await signInWithRedirect(auth, googleProvider);
      const authResponse = await signInWithPopup(auth, googleProvider);

      // For Debugging
      console.log(authResponse);

      // Does account already exist
      const accountExist = await doesAccountExist(authResponse.user.uid);

      console.log(accountExist);

      if (!accountExist) {
        // If Account doesn't exist, create account details
        const accountInformation: AccountType = {
          accountId: authResponse.user.uid,
          email: authResponse.user.email,
          fullname: authResponse.user.displayName,
          phoneNumber: authResponse.user.phoneNumber,
          profileImage: "",
          role: ["user"],
          stores: [],
          accountStatus: true,
          createdAt: new Date(),
          updateAt: new Date(),
          theme: "light",
          totalStores: 0,
          totalProductsUploaded: 0,
          totalSales: 0,
          lastLogin: new Date(),
          favourites: [],
        };

        await createNewAccount(accountInformation);
      }

      setUserCredential(authResponse.user);
      toast.success("Account logged in");
      setIsAuthVisible(false);

      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signup = async (formData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsAuthLoading(true);
      const { email, password, fullname } = formData;

      const authResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If Account doesn't exist, create account details
      const accountInformation: AccountType = {
        accountId: authResponse.user.uid,
        email: email,
        fullname: fullname,
        phoneNumber: "",
        profileImage: "",
        role: ["user"],
        stores: [],
        accountStatus: true,
        createdAt: new Date(),
        updateAt: new Date(),
        theme: "light",
        totalStores: 0,
        totalProductsUploaded: 0,
        totalSales: 0,
        lastLogin: new Date(),
        favourites: [],
      };

      await createNewAccount(accountInformation);
      setUserCredential(authResponse.user);
      toast.success("Account logged in");
      setIsAuthVisible(false);
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("(auth/weak-password)")) {
        toast.error("Password is too weak");
        return;
      }
      if (error.message.includes("(auth/email-already-in-use)")) {
        toast.error("Account already exist");
        return;
      }
      toast.error("An error occurred");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = async (formData: { email: string; password: string }) => {
    try {
      setIsAuthLoading(true);
      const { email, password } = formData;
      const authResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUserCredential(authResponse.user);
      toast.success("Account logged in");
      setIsAuthVisible(false);
      return;
    } catch (error: any) {
      console.error(error);

      if (error.message.includes("(auth/invalid-credential)")) {
        toast.error("Wrong email or password");
        return;
      }
      toast.error("An error occurred");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signout = async () => {
    try {
      setIsAuthLoading(true);
      await signOut(auth);
      toast.success("Account logged out");
      setTimeout(() => {
        toast.success("Log back in to access more features");
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserCredential(user || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      authBasedRoute.some((route: string) => location.pathname.includes(route))
    ) {
      // Handle route changes if necessary
    }
  }, [userCredential, location]);

  useEffect(() => {
    if (!userCredential) return setAccountDetail(null);
    listenToAccount(userCredential.uid, (account: AccountType) => {
      setAccountDetail(account);
    });
  }, [userCredential]);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        console.log("Attempting to get redirect result...");
        const result = await getRedirectResult(auth);
        console.log("Redirect result:", result);

        if (result) {
          const user = result.user;
          console.log("Signed in user:", user);
          setUserCredential(user);
        } else {
          console.log(
            "No redirect result found. User may not have been redirected."
          );
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signout,
        login,
        userCredential,
        accountDetail,
        continueWithGoogle,
        setIsAuthVisible,
      }}
    >
      {children}
      {/* <LoadingScreen isVisible={isAuthLoading} /> */}
      <AuthScreen
        isVisible={isAuthVisible}
        hideVisibility={() => setIsAuthVisible(false)}
      />
      <LoadingBar isVisible={isAuthLoading} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
