import {startNewRound} from "./gameFunctions";

const handCount = 4;

let currentHand = [];
let discard = [];

export function getEnemyHand() {
	return currentHand;
}

export function setupEnemyHand(abilityJSONList) {
	currentHand = [];
	discard = [];
	let abilities = Object.values(abilityJSONList);
	for (let i = 0; i < Math.min(handCount, abilities.length); i++) {
		let index = Math.floor(Math.random() * abilities.length);

		let ability = abilities.splice(index, 1)[0];
		currentHand.push(ability);
	}
	for (let i = 0; i < abilities.length; i++) {
		discard.push(abilities[i]);
	}
}

export function enemyPlayActions(hand) {
	let playedActions = [];

	let handLength = hand.length;
	for (let i = 0; i < handLength; i++) {
		let playedAction = currentHand[hand[i]];
		discard.push(playedAction);
		playedActions.push(playedAction);
	}
	let newHand = [];
	for (let i = 0; i < currentHand.length; i++) {
		if (!hand.includes(i)) {
			newHand.push(currentHand[i]);
		}
	}
	currentHand = newHand;

	for (let i = 0; i < handLength; i++) {
		let newAction = discard.splice(0, 1)[0];
		currentHand.push(newAction);
	}
}
