"use client";

import {generateCharacters} from "@/ai/characterGenerationAI";
import styles from "../css/home.module.css";
import {useEffect, useState} from "react";
import {CustomButton} from "./CustomButton";
import {AbilityComponent} from "./AbilityComponent";
import {
	getAbilityComponents,
	getCharacterJSON,
	setCharacterJSON,
	setEnemyJSON,
	updateAbilityComponents,
} from "@/game/gameInfo";
import Link from "next/link";

export function CharacterSelectionList({onClick}) {
	const [stringJSON, setStringJSON] = useState("");

	let list = [];
	useEffect(() => {
		generateCharacters(2).then((characterJSONString) => {
			let json = JSON.parse(characterJSONString);
			let enemyJSON = json.characters[0];
			setEnemyJSON(enemyJSON);

			json.characters.splice(0, 1);
			setStringJSON(JSON.stringify(json));
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
	let characterImagePrompt = characterJSON.imagePrompt;

	updateAbilityComponents(characterJSON);
	let abilityComponents = getAbilityComponents(name);

	for (let i = 0; i < abilityComponents.length; i++) {
		let imagePrompt = abilities[i].imagePrompt.replaceAll(" ", "-");

		const url =
			"https://image.pollinations.ai/prompt/" +
			imagePrompt +
			"?width=256&height=256&model=flux&seed=42&nologo=true";
		//?width=1024&height=1024&model=flux&seed=42&nologo=true&enhance=false
		/*const imageComponent = <img src={url} width={"100%"} alt="Ability Image" />;

		abilityComponents.push(
			<AbilityComponent key={i} abilityJSON={abilities[i]} imageComponent={imageComponent} />
		);*/
	}

	function handleSelect() {
		console.log("set:");
		console.log(characterJSON);
		setCharacterJSON(characterJSON);
		console.log(getCharacterJSON());
	}

	return (
		<div className={styles.characterInfo}>
			<h1>{name}</h1>
			<h2>{description}</h2>
			<h1>{health}</h1>
			<div
				style={{
					width: "100%",
					display: "grid",
					justifyItems: "center",
					gridTemplateColumns: "1fr 1fr 1fr 1fr",
					overflow: "hidden",
				}}
			>
				{abilityComponents}
			</div>
			<CustomButton onClick={handleSelect} type={"link"} href="/game">
				<h2>Select</h2>
			</CustomButton>
		</div>
	);
}

export function CharacterComponent({characterJSON, onClick}) {
	let name = characterJSON.name;
	let description = characterJSON.description;
	let health = characterJSON.health;
	let imagePrompt = characterJSON.imagePrompt;

	//imagePrompt = imagePrompt.replaceAll(" ", "-");

	const url =
		"https://image.pollinations.ai/prompt/" +
		imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	//const url = "https://image.pollinations.ai/prompt/" + "imagePrompt" + "?nologo=true";
	console.log(url);

	return (
		<button
			onClick={() => onClick(JSON.stringify(characterJSON))}
			className={styles.characterContainer}
		>
			<h1>{name}</h1>
			<img src={url} width={"100%"} alt="AI-generated logo" />
			<h2>{description}</h2>
			<h2>{health}</h2>
		</button>
	);
}
