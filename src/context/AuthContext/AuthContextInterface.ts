import { User } from "firebase/auth";
import { AccountType } from "../../types/account_type";

export interface AuthContextInterface {
  signup: (formData: {
    fullname: string;
    email: string;
    password: string;
  }) => void;
  signout: any;
  login: any;
  continueWithGoogle: () => void;
  userCredential: User | null | undefined;
  accountDetail: AccountType | null;
  setIsAuthVisible: any;
}
