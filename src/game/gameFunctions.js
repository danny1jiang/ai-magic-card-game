import {executeRoundActions} from "@/ai/actionAI";
import {getEnemyAIActions} from "@/ai/enemyAI";
import {getEnemyJSON} from "./gameInfo";
import {GameState} from "./gameState";
import {enemyPlayActions} from "./enemyHandInfo";

export async function startNewRound(playedActions) {
	let enemyActions = [];
	let enemyActionNames = await getEnemyAIActions();
	let enemyActionIndices = [];
	enemyActionNames.forEach((actionName) => {
		enemyActionIndices.push(getEnemyJSON().abilities.indexOf(actionName));
		enemyActions.push(getEnemyJSON().abilities.find((ability) => ability.name === actionName));
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

	let playerDamage = resultJSON.player.damageTaken;
	let enemyDamage = resultJSON.enemy.damageTaken;

	let newPlayerHealth = playerHealth - playerDamage;
	let newEnemyHealth = enemyHealth - enemyDamage;

	GameState.setPlayerHealth(Math.max(newPlayerHealth, 0));
	GameState.setEnemyHealth(Math.max(newEnemyHealth, 0));

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
