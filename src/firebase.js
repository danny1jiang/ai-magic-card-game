// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {addDoc, collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {firebaseConfig} from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getDatabase() {
	return db;
}

export async function addCharacterJSONToDatabase(characterJSON, enemyJSON) {
	try {
		//let docRef = await setDoc(collection(db, "playerJSON"), characterJSON);
		//docRef = await addDoc(collection(db, "enemyJSON"), enemyJSON);
		await setDoc(doc(db, "playerJSON", new Date().getTime().toString()), characterJSON);
		await setDoc(doc(db, "enemyJSON", new Date().getTime().toString()), enemyJSON);
		//console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

export async function getDatabaseCharacterJSON() {
	let playerJSON = {};
	let enemyJSON = {};
	const querySnapshot = await getDocs(collection(db, "playerJSON"));
	playerJSON = querySnapshot.docs[1].data();

	const querySnapshot2 = await getDocs(collection(db, "enemyJSON"));
	enemyJSON = querySnapshot2.docs[1].data();
	return {playerJSON: playerJSON, enemyJSON: enemyJSON};
}

export function setDatabaseCharacterIndex(index) {
	if (global.window !== undefined) {
		global.window.localStorage.setItem("characterIndex", index);
	}
}

export function getDatabaseCharacterIndex() {
	if (global.window !== undefined) {
		const index = parseInt(global.window.localStorage.getItem("characterIndex"));
		return index;
	}
}
