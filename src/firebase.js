// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {addDoc, collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {firebaseConfig} from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const databaseLength = (await getDocs(collection(db, "playerJSON"))).size;

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

	let index1 = getDatabaseCharacterIndex();
	let index2 = index1;
	if (index1 >= querySnapshot.size) {
		index1 = Math.floor(Math.random() * querySnapshot.size);
		index2 = Math.floor(Math.random() * querySnapshot.size);
	}
	playerJSON = querySnapshot.docs[index1].data();

	const querySnapshot2 = await getDocs(collection(db, "enemyJSON"));
	enemyJSON = querySnapshot2.docs[index2].data();
	return {playerJSON: playerJSON, enemyJSON: enemyJSON};
}

export function setDatabaseCharacterIndex(index) {
	if (index > databaseLength) {
		index = databaseLength;
	}
	if (global.window !== undefined) {
		global.window.localStorage.setItem("characterIndex", index);
	}
}

export function getDatabaseCharacterIndex() {
	if (global.window !== undefined) {
		let stringIndex = global.window.localStorage.getItem("characterIndex");
		if (stringIndex === null) return 0;
		const index = parseInt(stringIndex);
		if (index == NaN) return 0;
		return index;
	}
	return 0;
}
