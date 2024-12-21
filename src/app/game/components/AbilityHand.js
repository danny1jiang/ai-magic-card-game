import {getPlayerHand, playActions, setupPlayerHand} from "@/game/playerHandInfo";
import styles from "../game.module.css";
import {useEffect, useState} from "react";
import {AbilityComponent} from "@/components/AbilityComponent";
import {CustomButton} from "@/components/CustomButton";

export function AbilityHand({
	abilityJSONList,
	setPlayerPlayedCards,
	setEnemyPlayedCards,
	onRoundEnd,
}) {
	const [currentHand, setCurrentHand] = useState([]);
	const [abilityHandComponents, setAbilityHandComponents] = useState([]);
	const [selectedCards, setSelectedCards] = useState([]);

	useEffect(() => {
		setupPlayerHand(abilityJSONList);
		setCurrentHand([...getPlayerHand()]);
	}, []);

	useEffect(() => {
		let abilityHandComponents = [];
		for (let i = 0; i < currentHand.length; i++) {
			abilityHandComponents.push(
				<CardComponent
					key={i}
					index={i}
					abilityJSON={currentHand[i]}
					isSelected={selectedCards.includes(i)}
					onClick={() => handleSelect(i)}
				/>
			);
		}
		setAbilityHandComponents(abilityHandComponents);
	}, [currentHand, selectedCards]);

	async function handleConfirm(selectedCards) {
		let playerPlayedCards = [];
		for (let i = 0; i < selectedCards.length; i++) {
			playerPlayedCards.push(currentHand[selectedCards[i]]);
		}
		setPlayerPlayedCards(playerPlayedCards);
		let promise = playActions(selectedCards);
		setCurrentHand([...getPlayerHand()]);
		setSelectedCards([]);

		let {playerActions, enemyActions, resultJSON} = await promise;
		setEnemyPlayedCards(enemyActions);
		onRoundEnd(resultJSON);
	}

	function handleSelect(num) {
		if (selectedCards.includes(num)) {
			let tempSelectedCards = [...selectedCards];
			tempSelectedCards.splice(tempSelectedCards.indexOf(num), 1);
			setSelectedCards(tempSelectedCards);
		} else {
			setSelectedCards([...selectedCards, num]);
		}
	}

	return (
		<div className={styles.bottomContainer}>
			<div className={styles.handAdjacentContainer}>
				<CustomButton onClick={() => handleConfirm(selectedCards)}>
					<h2>Confirm</h2>
				</CustomButton>
			</div>

			<div className={styles.abilityHandContainer}>{abilityHandComponents}</div>
			<div className={styles.handAdjacentContainer}></div>
		</div>
	);
}

function CardComponent({index, isSelected, onClick, abilityJSON}) {
	let bottom = -15;
	if (index === 1 || index === 2) {
		bottom = -10;
	}

	let style = {
		position: "relative",
		marginLeft: "-5vh",
		marginRight: "-5vh",
		borderStyle: "solid",
		borderColor: "rgb(0,0,0,0)",
		padding: 0,
		backgroundColor: "rgb(0,0,0,0)",
		rotate: index * 5 + -7.5 + "deg",
		bottom: bottom + "%",
	};
	if (isSelected) {
		style = {...style, position: "relative", bottom: bottom + 10 + "%", zIndex: 1};
	}

	return (
		<div style={style} onClick={onClick}>
			<AbilityComponent showBack={isSelected} abilityJSON={abilityJSON} />
		</div>
	);
}
