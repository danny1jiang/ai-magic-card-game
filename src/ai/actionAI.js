import {getAPIKey} from "@/utils/serverUtils";
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

let chatSession;

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: "object",
		properties: {
			description: {
				type: "string",
			},
			player: {
				type: "object",
				properties: {
					damageTaken: {
						type: "number",
					},
					buffs: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
								},
								count: {
									type: "integer",
								},
								shortDescription: {
									type: "string",
								},
							},
							required: ["name", "count", "shortDescription"],
						},
					},
					debuffs: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
								},
								count: {
									type: "integer",
								},
								shortDescription: {
									type: "string",
								},
							},
							required: ["name", "count"],
						},
					},
				},
				required: ["damageTaken", "buffs", "debuffs"],
			},
			enemy: {
				type: "object",
				properties: {
					damageTaken: {
						type: "number",
					},
					buffs: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
								},
								count: {
									type: "integer",
								},
								shortDescription: {
									type: "string",
								},
							},
							required: ["name", "count", "shortDescription"],
						},
					},
					debuffs: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
								},
								count: {
									type: "integer",
								},
								shortDescription: {
									type: "string",
								},
							},
							required: ["name", "count", "shortDescription"],
						},
					},
				},
				required: ["damageTaken", "buffs", "debuffs"],
			},
			arenaEffects: {
				type: "array",
				items: {
					type: "string",
				},
			},
			detailedDescription: {
				type: "string",
			},
			buffEffects: {
				type: "string",
			},
			debuffEffects: {
				type: "string",
			},
		},
		required: [
			"description",
			"player",
			"enemy",
			"arenaEffects",
			"detailedDescription",
			"buffEffects",
			"debuffEffects",
		],
	},
};

export async function initializeActionAI() {
	const apiKey = await getAPIKey();
	const genAI = new GoogleGenerativeAI(apiKey);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction:
			"You will be handling the combat for a card game. The player or opponent may use multiple actions in one turn. I will be sending text with two parts: one for the player's actions and one for their opponent's.  Handle these actions on a first-come-first-serve basis for actions from the same side and in order of priority for actions between different sides. A greater priority number means it should go first. Based on our actions, explain what will happen this turn and provide a result. If one action's properties would make it have an advantage in the encounter, make it deal more damage, up to the max damage. Make sure, most of the time, that one side is more successful than the other, unless the two actions truly do cancel each other out. \n\nActions may be of the following types:\nOffensive: Focused primarily on dealing damage / going on the offensive\nBuff: Focused on giving oneself buffs like healing, dealing more damage, or status effects. These should last at least three rounds,. Allow these to stack.\nDebuff: Focused on debuffing the opponent, such as having them deal less damage. These should last at least three rounds. Allow these to stack.\nArena Effect: Provide a status effect for the arena, buffing certain actions and debuffing others. These arena effects should be generally more powerful, costing more mana. \n\nThe actions will be in this format:\nName: (ability name)\nType: (ability type)\nPriority: (priority from 1-10, 10 being highest priority meaning it always goes first)\nCost: (mana cost)\nDescription: (ability description)\nBase Damage: (Base damage if successful)\n\nIf an action is played with long lasting effects, such as buff, debuff, or arena effect, remember them and take them into account when you are playing out a turn. Multiply the effects of buffs and debuffs by the count of the buffs and debuffs. Arena effects should not stack, but allow multiple unique arena effects.\nYour response should contain the following information:\n\nDescription:\n(describe what happened this turn)\n\nBuff Effects:\n(Describe the effect that every buff has for all buffs currently in effect)\n\nDebuff Effects:\n(Describe the effect that every debuff has for all debuffs currently in effect)\n\nDetailed Description:\n(Outline your thought process and write the equations for buffs / debuffs / damage taken / etc.\n\nplayer:\nDamage Taken This Round: (damage taken by player 1 this turn)\nBuffs: (all buffs currently active for player 1, since the start of the game, include the name and how many times it has been stacked on this character)\nDebuffs (all debuffs currently active for player 2, since the start of the game, include the name and how many times it has been stacked on this character)\n\nenemy:\nDamage Taken This Round: (damage taken by player 2 this turn)\nBuffs: (all buffs currently active for player 2, since the start of the game, include the name and how many times it has been stacked on this character)\nDebuffs (all debuffs currently active for player 2, since the start of the game, include the name and how many times it has been stacked on this character)\n\nArena Effects:\n(Any arena effects in play)",
	});

	chatSession = model.startChat({
		generationConfig,
		history: [],
	});
}

export async function executeRoundActions(playerAction, enemyAction) {
	if (chatSession === undefined) return;
	const result = await chatSession.sendMessage(
		"Player Action: " + playerAction + "\nEnemy Action: " + enemyAction
	);
	console.log(result.response.text());
	let resultJSON = JSON.parse(result.response.text());
	return resultJSON;
}

export async function getActionChatHistory() {
	return await chatSession.getHistory();
}
