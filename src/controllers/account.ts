import {
  createDocument,
  getCollectionByField,
  getDocumentById,
  liveListen,
} from "../firebase/firebaseTools";
import { AccountType } from "../types/account_type";

export const createNewAccount = (accountInfo: AccountType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await createDocument(
        "Account",
        accountInfo.accountId,
        accountInfo
      );
      resolve(res);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const doesAccountExist = (uid: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const accounts = await getCollectionByField("Account", "accountId", uid);

      resolve(accounts.length > 0);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const listenToAccount = (
  uid: string,
  onSnapshot: (account: any) => void
) => {
  liveListen("Account", uid, onSnapshot);
};

export const getAccountNameAndImage = (uid: string) => {
  return new Promise<{ fullname: string; profileImage: string }>(
    async (resolve, reject) => {
      try {
        const { fullname, profileImage } = await getDocumentById(
          "Account",
          uid
        );

        resolve({ fullname, profileImage });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }
  );
};
