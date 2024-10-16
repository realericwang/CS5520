import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

async function addToDB(collectionName, data) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function deleteFromDB(deletedID, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedID));
  } catch (err) {
    console.log(err);
  }
}

async function deleteAllFromDB(collectionName) {
  try {
    const q = query(collection(database, collectionName));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log(`All documents in ${collectionName} have been deleted.`);
  } catch (err) {
    console.error(`Error deleting documents from ${collectionName}:`, err);
  }
}

async function updateWarningInDB(collectionName, docId, isWarning) {
  try {
    const docRef = doc(database, collectionName, docId);
    await updateDoc(docRef, { warning: isWarning });
    console.log(`Document ${docId} updated with warning: ${isWarning}`);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export { addToDB, deleteFromDB, deleteAllFromDB, updateWarningInDB };
