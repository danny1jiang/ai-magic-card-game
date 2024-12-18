"use client";

import {generateCharacters} from "@/AI";
import styles from "../css/home.module.css";
import {useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";

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

export function CharacterInfoModal({stringJSON}) {
	let characterJSON = JSON.parse(stringJSON);

	let name = characterJSON.name;
	let description = characterJSON.description;
	let health = characterJSON.health;
	let abilities = characterJSON.abilities;

	let abilityComponents = [];
	for (let i = 0; i < abilities.length; i++) {
		abilityComponents.push(<AbilityComponent key={i} ability={abilities[i]} />);
	}

	function handleSelect() {
		console.log(name);
	}

	return (
		<div className={styles.characterInfo}>
			<h1>{name}</h1>
			<h2>{description}</h2>
			<h1>{health}</h1>
			<div
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				{abilityComponents}
			</div>
			<CustomButton onClick={handleSelect}>
				<h3>Select</h3>
			</CustomButton>
		</div>
	);
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

function AbilityComponent({ability}) {
	let name = ability.name;
	let type = ability.type;
	let description = ability.description;
	let priority = ability.priority;
	let cost = ability.cost;
	let baseDamage = ability.baseDamage;

	return (
		<div className={styles.abilityComponent}>
			<h1>{name}</h1>
			<h2>Type: {type}</h2>
			<h2>{description}</h2>
		</div>
	);
}
