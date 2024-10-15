import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
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

export { addToDB, deleteFromDB };
