import {executeRoundActions} from "@/ai/actionAI";
import {getEnemyAIActions} from "@/ai/enemyAI";
import {getCharacterJSON, getEnemyJSON} from "./gameInfo";
import {GameState} from "./gameState";
import {enemyPlayActions, getEnemyHand} from "./enemyHandInfo";

export async function startNewRound(playedActions) {
	let enemyActions = [];
	let enemyActionNames = await getEnemyAIActions();
	let enemyActionIndices = [];
	enemyActionNames.forEach((actionName) => {
		let abilityJSON = getEnemyJSON().abilities.find((ability) => ability.name === actionName);
		let index = 0;
		getEnemyHand().forEach((ability) => {
			if (ability.name === actionName) {
				enemyActionIndices.push(index);
			}
			index++;
		});
		enemyActions.push(abilityJSON);
	});
	enemyPlayActions(enemyActionIndices);

	console.log(playedActions);
	console.log(enemyActionNames);
	let resultJSON = await executeRoundActions(
		JSON.stringify(playedActions),
		JSON.stringify(enemyActions)
	);

	// Health updates
	let playerHealth = GameState.getPlayerHealth();
	let enemyHealth = GameState.getEnemyHealth();

	let playerMaxHealth = getCharacterJSON().health;
	let enemyMaxHealth = getEnemyJSON().health;

	let playerDamage = resultJSON.player.damageTaken;
	let enemyDamage = resultJSON.enemy.damageTaken;

	let playerHeal = resultJSON.player.healthHealed;
	let enemyHeal = resultJSON.enemy.healthHealed;

	let newPlayerHealth = playerHealth - playerDamage + playerHeal;
	let newEnemyHealth = enemyHealth - enemyDamage + enemyHeal;

	GameState.setPlayerHealth(Math.min(Math.max(newPlayerHealth, 0), playerMaxHealth));
	GameState.setEnemyHealth(Math.min(Math.max(newEnemyHealth, 0), enemyMaxHealth));
	// Mana updates
	let playerMana = GameState.getPlayerMana();
	let enemyMana = GameState.getEnemyMana();

	let playerManaCost = 0;
	let enemyManaCost = 0;

	playedActions.forEach((action) => {
		playerManaCost += action.cost;
	});
	enemyActions.forEach((action) => {
		enemyManaCost += action.cost;
	});

	let newPlayerMana = playerMana - playerManaCost + 2;
	let newEnemyMana = enemyMana - enemyManaCost + 2;

	GameState.setPlayerMana(Math.max(Math.min(GameState.getMaxMana(), newPlayerMana), 0));
	GameState.setEnemyMana(Math.max(Math.min(GameState.getMaxMana(), newEnemyMana), 0));

	return {
		enemyActions: enemyActions,
		playerActions: playedActions,
		resultJSON: resultJSON,
	};
}
