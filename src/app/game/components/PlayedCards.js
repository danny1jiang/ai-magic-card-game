import {AbilityComponent} from "@/components/AbilityComponent";
import styles from "../game.module.css";
import {CustomButton} from "@/components/CustomButton";
import {useState} from "react";

export function PlayedCards({show, playerPlayedCards, enemyPlayedCards, closeModal}) {
	if (!show) return null;

	if (playerPlayedCards === undefined) return null;

	let playerPlayedCardsComponents = [];
	for (let i = 0; i < playerPlayedCards.length; i++) {
		playerPlayedCardsComponents.push(
			<AbilityWrapper key={i} abilityJSON={playerPlayedCards[i]} />
		);
	}

	let enemyPlayedCardsComponents = [];
	if (enemyPlayedCards !== undefined) {
		for (let i = 0; i < enemyPlayedCards.length; i++) {
			enemyPlayedCardsComponents.push(
				<AbilityWrapper key={i} abilityJSON={enemyPlayedCards[i]} />
			);
		}
	}

	return (
		<div className={styles.playedCardsContainer}>
			<div style={inlineStyles.playedCardsOneSideContainer}>
				<h1>Opponent Cards</h1>
				{enemyPlayedCards !== undefined ? (
					<div className={styles.playedCardsOneSide}>{enemyPlayedCardsComponents}</div>
				) : (
					<div className={styles.playedCardsOneSide}>
						<h2>Opponent is thinking...</h2>
					</div>
				)}
			</div>
			<div style={inlineStyles.playedCardsOneSideContainer}>
				<h1>Your Cards:</h1>
				<div className={styles.playedCardsOneSide}>{playerPlayedCardsComponents}</div>
			</div>
			{enemyPlayedCards !== undefined ? (
				<CustomButton onClick={closeModal}>Continue</CustomButton>
			) : null}
		</div>
	);
}

function AbilityWrapper({abilityJSON}) {
	const [showBack, setShowBack] = useState(false);

	function handleClick() {
		setShowBack(!showBack);
	}

	return (
		<div onClick={handleClick}>
			<AbilityComponent abilityJSON={abilityJSON} showBack={showBack} />
		</div>
	);
}

const inlineStyles = {
	playedCardsOneSideContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		margin: "1%",
		paddingTop: "1%",
		color: "white",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
};
