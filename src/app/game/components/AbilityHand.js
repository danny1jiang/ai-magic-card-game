import {getPlayerHand, playActions, setupPlayerHand} from "@/game/playerHandInfo";
import styles from "../game.module.css";
import {useEffect, useState} from "react";
import {AbilityComponent} from "@/components/AbilityComponent";
import {CustomButton} from "@/components/CustomButton";

export function AbilityHand({abilityJSONList}) {
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

	function handleConfirm(selectedCards) {
		if (selectedCards.length > 0) {
			playActions(selectedCards);
			setCurrentHand([...getPlayerHand()]);
			setSelectedCards([]);
		}
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
			<CustomButton onClick={() => handleConfirm(selectedCards)}>
				<h2>Confirm</h2>
			</CustomButton>

			<div className={styles.abilityHandContainer}>{abilityHandComponents}</div>
		</div>
	);
}

function CardComponent({isSelected, onClick, abilityJSON}) {
	let style = {borderWidth: 10, borderStyle: "solid"};
	if (isSelected) {
		style = {...style, borderColor: "white"};
	}

	return (
		<button style={style} onClick={onClick}>
			<AbilityComponent abilityJSON={abilityJSON} />
		</button>
	);
}
