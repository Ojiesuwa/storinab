export interface AuthContextInterface {
  signup: () => void;
  signout: () => void;
  login: () => void;
  userCredential: {} | null | undefined;
  accountDetail: {} | null;
}
