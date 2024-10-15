import { addDoc, collection } from "firebase/firestore";
import { database } from "./firebaseSetup";
async function addToDB(collectionName, data) {
    try {   
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export { addToDB };