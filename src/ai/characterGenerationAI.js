import {getAPIKey} from "../utils/serverUtils";

import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

const generationConfig = {
	temperature: 1.2,
	topP: 1,
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
			"You are going to generate unique characters for a card game that uses AI to determine the outcome of actions. This game should be magic themed, and each character should have a unique and magical sounding name of 1 word (Be creative with the characters' theme). These characters should be unique with their own strengths and weaknesses (Be creative here, do not just stick with stereotypical strengths and weaknesses). An average character should have around 300 health, but it should vary based on the character's strengths and weaknesses. You should also write a prompt for pollinations image generation AI to generate an image of this character. Emphasize that this image should be in the anime style. (Be VERY specific with this prompt, and make sure it does not contain explicit images). The description for this character should be at most 20 words.\n\nYou will then generate 8 specialized actions and respective image prompts for each action for this character. These actions should work together, allowing for strategy. Each action will have a mana cost, and each player will have 10 mana to start off with. Each turn, they regenerate 2 mana. Do not make the actions too complicated, but they should still involve strategy. If any chance is involved, provide specific percentages for success. Keep in mind that this is a card game so certain actions would not be possible or reasonable to perform. MAKE SURE THE EACH CHARACTER'S ACTIONS ARE BALANCED AGAINST THE OTHER CHARACTER'S. For example, if a character has a damaging move that costs 4 mana, another character's buff should not cost more to block less damage.\n\nActions can be in the following types:\nOffensive: Focused primarily on dealing damage / going on the offensive\nBuff: Focused on giving oneself buffs like healing, dealing more damage, or status effects. These should be significant and last at least 3 rounds. Only buff already established mechanics (increased damage, increased priority, etc.)\nDebuff: Focused on debuffing the opponent, such as having them deal less damage. These should be significant and last at least 3 rounds. Only debuff already established mechanics (decreased damage, decreased priority, etc.)\nArena Effect: Provide a status effect for the arena, buffing certain actions and debuffing others. These arena effects should be generally more powerful, costing more mana. These should also provide a VERY STRONG effect, advantageous for this character (For example, doubling damage or increasing priority number for certain moves) Any % modification should be at least 50%. Only modify already established mechanics.\n\nInclude all of the action's effects within the description. Be ready to include the following information in the actions:\n\nName: (ability name)\nType: (ability type)\nPriority: (priority from 1-5, 5 being highest priority meaning it always goes first)\nCost: (The mana cost of this ability, make sure to scale it based on how powerful this ability is (For example, how much damage it does or how powerful its buff is))\nDescription: (ability description)\nBase Damage: (Base damage if successful, the average action should deal around 20 damage)\nImage Prompt: (Detailed pollinations ai image generation prompt, similar to the character image prompt but for the ability instead. Emphasize that this image should be in an anime style. IF THE IMAGE REQUIRES A FIGURE OR PERSON, MAKE SURE THE FIGURE IS VERY GENERIC AND UNRECOGNIZABLE. Make sure it does not contain explicit images)\n\nEach character should have at least 1 arena effect, at most 2 buffs / debuffs, and the rest should be offensive.",
	});

	console.log("started prompt");
	const chatSession = model.startChat({
		generationConfig,
	});

	const result = await chatSession.sendMessage("Generate " + count + " characters");
	const stringJSON = result.response.text();

	return stringJSON;
}
