"use client";

import {generateCharacters} from "@/AI";
import styles from "../css/home.module.css";
import {useEffect, useState} from "react";

export function CharacterSelectionList({onClick}) {
	const [stringJSON, setStringJSON] = useState("");

	let list = [];
	useEffect(() => {
		generateCharacters(3).then((characterJSONString) => {
			setStringJSON(characterJSONString);
		});
	}, []);

	if (stringJSON == "") {
		return null;
	} else {
		let list = [];
		let characterJSONList = JSON.parse(stringJSON);
		console.log(characterJSONList.characters.length);
		for (let i = 0; i < characterJSONList.characters.length; i++) {
			list.push(
				<CharacterComponent
					key={i}
					onClick={onClick}
					characterJSON={characterJSONList.characters[i]}
				/>
			);
		}
		return <div className={styles.characterListContainer}>{list}</div>;
	}
}

function CharacterComponent({characterJSON, onClick}) {
	let name = characterJSON.name;
	let description = characterJSON.description;
	let health = characterJSON.health;

	return (
		<button
			onClick={() => onClick(JSON.stringify(characterJSON))}
			className={styles.characterContainer}
		>
			<h1>{name}</h1>
			<h2>{description}</h2>
			<h2>{health}</h2>
		</button>
	);
}
