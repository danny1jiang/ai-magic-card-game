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
import {addCharacterJSONToDatabase, getDatabaseCharacterJSON} from "@/firebase";
import characterCardBorder from "../assets/characterCardBorder.png";

export function CharacterSelectionList({onClick}) {
	if (getCharacterJSON() == {}) {
		return null;
	} else {
		let list = [];
		/*for (let i = 0; i < characterJSONList.characters.length; i++) {
			list.push(
				<CharacterComponent
					key={i}
					onClick={onClick}
					characterJSON={characterJSONList.characters[i]}
				/>
			);
		}*/
		list.push(
			<CharacterComponent key={0} onClick={onClick} characterJSON={getCharacterJSON()} />
		);
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

	/*for (let i = 0; i < abilityComponents.length; i++) {
		let imagePrompt = abilities[i].imagePrompt.replaceAll(" ", "-");

		const url =
			"https://image.pollinations.ai/prompt/" +
			imagePrompt +
			"?width=256&height=256&model=flux&seed=42&nologo=true";

		fetch(url).then((response) => {
			console.log(response);
		});
		//?width=1024&height=1024&model=flux&seed=42&nologo=true&enhance=false
		fetch(url, {
			method: "GET",
			mode: "cors",
		}).then((response) => console.log(response));

		abilityComponents.push(
			<AbilityComponent key={i} abilityJSON={abilities[i]} imageComponent={imageComponent} />
		);
	}*/

	function handleSelect() {
		console.log("set:");
		console.log(characterJSON);
		//setCharacterJSON(characterJSON);
		console.log(getCharacterJSON());
	}
	abilityComponents = [];

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

	const url =
		"https://image.pollinations.ai/prompt/" +
		imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	return (
		<div
			onClick={() => onClick(JSON.stringify(characterJSON))}
			className={styles.characterContainer}
		>
			<img
				style={{
					position: "absolute",
					pointerEvents: "none",
					zIndex: 2,
				}}
				width={"97%"}
				src={characterCardBorder.src}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					textAlign: "center",
					position: "absolute",
					zIndex: 3,
					bottom: 0,
					height: "32%",
					width: "70%",
					fontSize: "1vh",
				}}
			>
				<h2>{description}</h2>
			</div>
			<img
				style={{
					position: "absolute",
					pointerEvents: "none",
					userSelect: "none",
					top: "8%",
					objectFit: "cover",
					pointerEvents: "none",
					userSelect: "none",
					outline: "rgb(0,0,0,0.5) solid 1.5vh",
					zIndex: 1,
				}}
				src={url}
				width={"76%"}
				alt="Character Image"
			/>
			<img
				style={{
					position: "absolute",
					pointerEvents: "none",
					userSelect: "none",
					pointerEvents: "none",
					userSelect: "none",
					top: 0,
				}}
				src={url}
				width={"80%"}
				height={"70%"}
				alt="Character Image"
			/>
		</div>
	);
}
