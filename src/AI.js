import {getAPIKey} from "./serverUtils";

const {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require("@google/generative-ai");

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: "object",
		properties: {
			characters: {
				type: "array",
				items: {
					type: "object",
					properties: {
						name: {
							type: "string",
						},
						health: {
							type: "number",
						},
						description: {
							type: "string",
						},
						abilities: {
							type: "array",
							items: {
								type: "object",
								properties: {
									name: {
										type: "string",
									},
									type: {
										type: "string",
									},
									priority: {
										type: "integer",
									},
									cost: {
										type: "integer",
									},
									description: {
										type: "string",
									},
									baseDamage: {
										type: "number",
									},
								},
								required: [
									"name",
									"type",
									"priority",
									"cost",
									"description",
									"baseDamage",
								],
							},
						},
					},
					required: ["name", "health", "description", "abilities"],
				},
			},
		},
		required: ["characters"],
	},
};

export async function generateCharacters(count) {
	const apiKey = await getAPIKey();
	const genAI = new GoogleGenerativeAI(apiKey);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction:
			"You are going to generate unique characters for a card game that uses AI to determine the outcome of actions. This game should be magic / elemental themed. These characters should be unique with their own strengths and weaknesses. An average character should have around 100 health, but it should vary based on the character's strengths and weaknesses. Generate them in the following format:\nName: (name)\nHealth: (health)\nDescription: (description)\n\nYou will then generate 3 specialized actions for this character. Each action will have a mana cost, and each player will have 10 mana to start off with. Each turn, they regenerate 2 mana. Keep in mind that the player and opponent CAN ONLY USE ONE ACTION PER TURN, and they play it at the same time, so actions that give short term buffs/debuffs are particularly weak. Do not make the actions too complicated, but they should still involve strategy. If any chance is involved, provide specific percentages for success. Keep in mind that this is a card game so certain actions would not be possible or reasonable to perform. MAKE SURE THE EACH CHARACTER'S ACTIONS ARE BALANCED AGAINST THE OTHER CHARACTER'S. For example, if a character has a damaging move that costs 4 mana, another character's buff should not cost more to block less damage.\n\nActions can be in the following types:\nOffensive: Focused primarily on dealing damage / going on the offensive\nBuff: Focused on giving oneself buffs like healing, dealing more damage, or status effects. These should last at least two rounds, or even permanently.\nDebuff: Focused on debuffing the opponent, such as having them deal less damage. These should last at least two rounds, or even permanently.\nArena Effect: Provide a status effect for the arena, buffing certain actions and debuffing others. These arena effects should be generally more powerful, costing more mana.\n\nInclude all of the action's effects within the description. Be ready to include the following information in the actions:\n\nName: (ability name)\nType: (ability type)\nPriority: (priority from 1-10, 1 being highest priority meaning it always goes first)\nCost: (mana cost)\nDescription: (ability description)\nBase Damage: (Base damage if successful)",
	});

	console.log("started prompt");
	const chatSession = model.startChat({
		generationConfig,
	});

	const result = await chatSession.sendMessage("Generate " + count + " characters");
	const stringJSON = result.response.text();

	return stringJSON;
}
