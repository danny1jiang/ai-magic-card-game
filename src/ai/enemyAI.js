import {getAPIKey} from "@/utils/serverUtils";
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
import {getActionChatHistory} from "./actionAI";
import {GameState} from "@/game/gameState";
import {getEnemyJSON} from "@/game/gameInfo";
import {getEnemyHand} from "@/game/enemyHandInfo";

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: "object",
		properties: {
			currentMana: {
				type: "integer",
			},
			actionsTotalCost: {
				type: "integer",
			},
			manaLeft: {
				type: "integer",
			},
			actionNames: {
				type: "array",
				items: {
					type: "string",
				},
			},
			reasoning: {
				type: "string",
			},
			zFinalActionNames: {
				type: "array",
				items: {
					type: "string",
				},
			},
			zFinalActionReasoning: {
				type: "string",
			},
		},
		required: [
			"currentMana",
			"actionsTotalCost",
			"manaLeft",
			"actionNames",
			"reasoning",
			"zFinalActionNames",
			"zFinalActionReasoning",
		],
	},
};

let chatSession;

export async function initializeEnemyAI(enemyCharacterJSON) {
	const apiKey = await getAPIKey();
	const genAI = new GoogleGenerativeAI(apiKey);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction:
			'You will be an AI enemy going against the player for a magic themed card game. You will be playing as the "enemy". Based on the history of our chat (it will include what happened during gameplay), you will select one or more actions to take. Use the chat history to your advantage: if an action combo was successful, you can try it again. Somtimes, it is better to save up mana instead of using an action. If you cannot play any actions due to not enough mana, do not play any actions. THE COST OF YOUR ACTIONS CANNOT EXCEED YOUR MANA COUNT. YOU CANNOT USE THE SAME ACTION TWICE. This is your character and their actions:\n' +
			JSON.stringify(enemyCharacterJSON) +
			"\nI will give you a hand of actions to use - you must only use actions from the hand I will provide you. Return the name of your actions and why you chose this. In your reasoning, include a step by step mana calculation. If your mana becomes negative, BE SURE TO REWORK YOUR STRATEGY SO YOUR MANA DOES NOT BECOME NEGATIVE. In your reasoning and zFinalActionReasoning, include a detailed explanation of the mana usage. Make sure your character has this action in their list of abilities. If you are unable to perform certain actions, rework your strategy and return your final action names under zFinalActionNames.",
	});

	console.log(enemyCharacterJSON);

	chatSession = model.startChat({
		generationConfig,
		history: [],
	});
}

export async function getEnemyAIActions() {
	if (chatSession === undefined) return [];
	chatSession.params.history = await getActionChatHistory();

	let playerHealth = GameState.getPlayerHealth();
	let enemyHealth = GameState.getEnemyHealth();

	let playerMana = GameState.getPlayerMana();
	let enemyMana = GameState.getEnemyMana();

	const result = await chatSession.sendMessage(
		"Player Health: " +
			playerHealth +
			", Enemy Health: " +
			enemyHealth +
			", Player Mana: 10" +
			playerMana +
			", Enemy mana: " +
			enemyMana +
			"Current abilities in hand:" +
			getEnemyHand()
	);
	console.log(result.response.text());
	const response = JSON.parse(result.response.text());

	let finalActionNames = [];
	let finalActionCost = 0;

	response.zFinalActionNames.forEach((actionName) => {
		let action = getEnemyJSON().abilities.find((ability) => ability.name === actionName);
		if (finalActionCost + action.cost <= enemyMana) {
			finalActionNames.push(actionName);
		}
		finalActionCost += action.cost;
	});

	return finalActionNames;
}
