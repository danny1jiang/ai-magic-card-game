import {AbilityComponent} from "@/components/AbilityComponent";
import styles from "../game.module.css";
import {CustomButton} from "@/components/CustomButton";

export function PlayedCards({show, playerPlayedCards, enemyPlayedCards, closeModal}) {
	console.log(playerPlayedCards);
	console.log(enemyPlayedCards);
	if (!show) return null;

	if (playerPlayedCards === undefined) return null;

	let playerPlayedCardsComponents = [];
	for (let i = 0; i < playerPlayedCards.length; i++) {
		playerPlayedCardsComponents.push(
			<AbilityComponent key={i} abilityJSON={playerPlayedCards[i]} />
		);
	}

	let enemyPlayedCardsComponents = [];
	if (enemyPlayedCards !== undefined) {
		for (let i = 0; i < enemyPlayedCards.length; i++) {
			enemyPlayedCardsComponents.push(
				<AbilityComponent key={i} abilityJSON={enemyPlayedCards[i]} />
			);
		}
	}

	return (
		<div className={styles.playedCardsContainer}>
			<h1>Enemy Cards</h1>
			<div className={styles.playedCardsOneSide}>{enemyPlayedCardsComponents}</div>
			<h1>Your Cards:</h1>
			<div className={styles.playedCardsOneSide}>{playerPlayedCardsComponents}</div>
			<CustomButton onClick={closeModal}>Next</CustomButton>
		</div>
	);
}
