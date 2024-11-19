import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  getDocs,
  updateDoc,
  setDoc,
  getDoc,
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

async function addToSubcollection(
  parentCollectionName,
  parentDocId,
  subcollectionName,
  data,
) {
  try {
    const subcollectionRef = collection(
      database,
      parentCollectionName,
      parentDocId,
      subcollectionName,
    );
    const docRef = await addDoc(subcollectionRef, data);
    console.log("Document written to subcollection with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document to subcollection: ", error);
  }
}

async function getSubcollectionDocs(
  parentCollectionName,
  parentDocId,
  subcollectionName,
) {
  try {
    const subcollectionRef = collection(
      database,
      parentCollectionName,
      parentDocId,
      subcollectionName,
    );
    const querySnapshot = await getDocs(subcollectionRef);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (error) {
    console.error("Error getting subcollection documents: ", error);
    return [];
  }
}

async function saveUserLocation(userId, locationData) {
  try {
    await setDoc(doc(database, "users", userId), {
      location: locationData
    }, { merge: true });
    console.log("Location saved for user:", userId);
    return true;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
}

async function getUserLocation(userId) {
  try {
    const docRef = doc(database, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().location;
    } else {
      console.log("No location data found for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error getting user location:", error);
    return null;
  }
}

export {
  addToDB,
  deleteFromDB,
  deleteAllFromDB,
  updateWarningInDB,
  addToSubcollection,
  getSubcollectionDocs,
  saveUserLocation,
  getUserLocation,
};
