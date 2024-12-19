"use client";
import {AbilityComponent} from "@/components/AbilityComponent";

let abilityComponents = {};
let characterJSON;

export function getAbilityComponents(name) {
	return abilityComponents[name];
}

export function resetAbilityComponents() {
	abilityComponents = {};
}

export function updateAbilityComponents(characterJSON) {
	let abilities = characterJSON.abilities;
	abilityComponents[characterJSON.name] = [];
	for (let i = 0; i < abilities.length; i++) {
		let imagePrompt = abilities[i].imagePrompt.replaceAll(" ", "-");

		const url =
			"https://image.pollinations.ai/prompt/" +
			imagePrompt +
			"?width=256&height=256&model=flux&seed=42&nologo=true";
		//?width=1024&height=1024&model=flux&seed=42&nologo=true&enhance=false
		//const imageComponent = <img src={url} width={"100%"} alt="Ability Image" />;

		abilityComponents[characterJSON.name].push(
			<AbilityComponent key={i} abilityJSON={abilities[i]} imageComponent={<div />} />
		);
	}
}

export function getCharacterJSON() {
	if (characterJSON === undefined) {
		const json = JSON.parse(localStorage.getItem("characterJSON"));
		characterJSON = json;
		return json;
	}
	return characterJSON;
}

export function setCharacterJSON(json) {
	characterJSON = json;
	localStorage.setItem("characterJSON", JSON.stringify(json));
}
