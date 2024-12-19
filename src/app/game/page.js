"use client";
import {getCharacterJSON} from "@/game/gameInfo";
import {AbilityHand} from "./components/AbilityHand";
import styles from "./game.module.css";

export default function GamePage() {
	return (
		<div className={styles.gameContainer}>
			<AbilityHand abilityJSONList={getCharacterJSON().abilities} />
		</div>
	);
}
