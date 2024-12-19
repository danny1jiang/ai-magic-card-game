const handCount = 4;

let currentHand = [];
let discard = [];

export function getPlayerHand() {
	return currentHand;
}

/*export function getPlayerDiscard() {
	return discard;
}*/

export function setupPlayerHand(abilityJSONList) {
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

export function playAction(num) {
	let playedAction = currentHand.splice(num, 1)[0];
	discard.push(playedAction);
	let newAction = discard.splice(0, 1)[0];
	currentHand.push(newAction);
}
