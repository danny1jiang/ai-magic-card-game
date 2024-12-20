import {getAPIKey} from "../utils/serverUtils";

import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

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
									imagePrompt: {
										type: "string",
									},
								},
								required: [
									"name",
									"type",
									"priority",
									"cost",
									"description",
									"baseDamage",
									"imagePrompt",
								],
							},
						},
						imagePrompt: {
							type: "string",
						},
					},
					required: ["name", "health", "description", "abilities", "imagePrompt"],
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
			"You are going to generate unique characters for a card game that uses AI to determine the outcome of actions. This game should be magic themed, and each character should have a unique and magical sounding name of 1 word. These characters should be unique with their own strengths and weaknesses. An average character should have around 100 health, but it should vary based on the character's strengths and weaknesses. You should also write a prompt for pollinations image generation AI to generate an image of this character in a fantasy style (Be VERY specific with this prompt).\n\nYou will then generate 8 specialized actions and respective image prompts for each action for this character. These actions should work together, allowing for strategy. Each action will have a mana cost, and each player will have 10 mana to start off with. Each turn, they regenerate 2 mana. Do not make the actions too complicated, but they should still involve strategy. If any chance is involved, provide specific percentages for success. Keep in mind that this is a card game so certain actions would not be possible or reasonable to perform. MAKE SURE THE EACH CHARACTER'S ACTIONS ARE BALANCED AGAINST THE OTHER CHARACTER'S. For example, if a character has a damaging move that costs 4 mana, another character's buff should not cost more to block less damage.\n\nActions can be in the following types:\nOffensive: Focused primarily on dealing damage / going on the offensive\nBuff: Focused on giving oneself buffs like healing, dealing more damage, or status effects. These should be significant and last permanently.\nDebuff: Focused on debuffing the opponent, such as having them deal less damage. These should be significant last permanently.\nArena Effect: Provide a status effect for the arena, buffing certain actions and debuffing others. These arena effects should be generally more powerful, costing more mana.\n\nInclude all of the action's effects within the description. Be ready to include the following information in the actions:\n\nName: (ability name)\nType: (ability type)\nPriority: (priority from 1-5, 5 being highest priority meaning it always goes first)\nCost: (mana cost)\nDescription: (ability description)\nBase Damage: (Base damage if successful)\nImage Prompt: (Detailed pollinations ai image generation prompt, similar to the character image prompt but for the ability instead. Also make it in the fantasy style. IF THE IMAGE REQUIRES A FIGURE OR PERSON, MAKE SURE THE FIGURE IS VERY GENERIC AND UNRECOGNIZABLE)\n\nEach character should have at least 1 arena effect, at most 2 buffs / debuffs, and the rest should be offensive.",
	});

	console.log("started prompt");
	const chatSession = model.startChat({
		generationConfig,
	});

	const result = await chatSession.sendMessage("Generate " + count + " characters");
	const stringJSON = result.response.text();

	return stringJSON;
}
