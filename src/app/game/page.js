"use client";
import {getCharacterJSON, getEnemyJSON} from "@/game/gameInfo";
import {AbilityHand} from "./components/AbilityHand";
import styles from "./game.module.css";
import {CharacterComponent} from "@/components/CharacterSelection";
import {useEffect, useState} from "react";
import {initializeActionAI} from "@/ai/actionAI";
import {initializeEnemyAI} from "@/ai/enemyAI";
import {GameState} from "@/game/gameState";
import {setupEnemyHand} from "@/game/enemyHandInfo";

export default function GamePage() {
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		initializeActionAI();
		initializeEnemyAI(getEnemyJSON());
		setupEnemyHand(getEnemyJSON().abilities);
		GameState.initializeGameState(getCharacterJSON(), getEnemyJSON());
		setInitialized(true);
	}, []);

	if (!initialized) return null;

	return (
		<div className={styles.gameContainer}>
			<AbilityHand abilityJSONList={getCharacterJSON().abilities} />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<CharacterComponent characterJSON={getCharacterJSON()} />
				<CharacterComponent characterJSON={getEnemyJSON()} />
			</div>
		</div>
	);
}
