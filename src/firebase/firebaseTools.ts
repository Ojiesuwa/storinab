import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db, storage } from "./config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Utility functions with type annotations
export const isDocumentExistent = (snapshot: DocumentSnapshot): boolean =>
  snapshot.exists();
export const isCollectionExistent = (snapshot: QuerySnapshot): boolean =>
  !snapshot.empty;

export const isDocumentExistentWithId = async (
  col: string,
  id: string
): Promise<boolean> => {
  try {
    const docRef = doc(db, col, id);
    const snapshot = await getDoc(docRef);
    return isDocumentExistent(snapshot);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const parseDocumentData = (
  snapshot: DocumentSnapshot
): DocumentData & { docId: string } => ({
  ...snapshot.data(),
  docId: snapshot.id,
});

export const parseCollectionData = (
  snapshot: QuerySnapshot
): Array<DocumentData & { docId: string }> => {
  const documents: Array<DocumentData & { docId: string }> = [];
  snapshot.forEach((doc: QueryDocumentSnapshot) => {
    documents.push({ ...doc.data(), docId: doc.id });
  });
  return documents;
};

export const getDocumentById = async (
  collectionName: string,
  docId: string
): Promise<DocumentData & { docId: string }> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const snapshot = await getDoc(docRef);
    return parseDocumentData(snapshot);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectionByName = async (
  collectionName: string
): Promise<Array<DocumentData & { docId: string }>> => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return parseCollectionData(snapshot);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<string> => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, data);
    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDocument = async (
  collectionName: string,
  documentName: string,
  data: DocumentData
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentName);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDocumentById = async (
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectionByField = async (
  collectionName: string,
  field: string,
  value: any
): Promise<Array<DocumentData & { docId: string }>> => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(
      colRef,
      where(field, "==", value),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return parseCollectionData(snapshot);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const liveListen = (
  collectionName: string,
  docId: string,
  cb: (data: DocumentData & { docId: string }) => void
): void => {
  const docRef = doc(db, collectionName, docId);
  onSnapshot(docRef, (snapshot) => {
    cb(parseDocumentData(snapshot));
  });
};

// Example of a typed uploadFile function (commented out as in the original code)

export const uploadFile = (
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = `${file.name.split(".")[0]}.${file.name
        .split(".")
        .pop()}`;
      const fileRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
