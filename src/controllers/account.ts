import { liveListen } from "../firebase/firebaseTools";

// export const createNewAccount = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (error) {}
//   });
// };

export const listenToAccount = (uid: string, onSnapshot: (account:any) => void) => {
  liveListen("Account", uid, onSnapshot);
};
