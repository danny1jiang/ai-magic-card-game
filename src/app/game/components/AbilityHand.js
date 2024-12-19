import {getPlayerDiscard, getPlayerHand, playAction, setupPlayerHand} from "@/game/playerState";
import styles from "../game.module.css";
import {useEffect, useState} from "react";
import {AbilityComponent} from "@/components/AbilityComponent";
import {CustomButton} from "@/components/CustomButton";

export function AbilityHand({abilityJSONList}) {
	const [currentHand, setCurrentHand] = useState([]);
	const [abilityHandComponents, setAbilityHandComponents] = useState([]);
	const [selectedCard, setSelectedCard] = useState(-1);

	useEffect(() => {
		setupPlayerHand(abilityJSONList);
		setCurrentHand([...getPlayerHand()]);
	}, []);

	useEffect(() => {
		let abilityHandComponents = [];
		console.log(currentHand);
		for (let i = 0; i < currentHand.length; i++) {
			abilityHandComponents.push(
				<CardComponent
					key={i}
					index={i}
					abilityJSON={currentHand[i]}
					selectedCard={selectedCard}
					onClick={() => handleSelect(i)}
				/>
			);
		}
		setAbilityHandComponents(abilityHandComponents);
	}, [currentHand, selectedCard]);

	function handleConfirm(num) {
		if (num !== -1) {
			console.log(num);
			playAction(num);
			setCurrentHand([...getPlayerHand()]);
			setSelectedCard(-1);
		}
	}

	console.log(selectedCard);

	function handleSelect(num) {
		if (selectedCard === num) {
			setSelectedCard(-1);
		} else {
			setSelectedCard(num);
		}
	}

	return (
		<div className={styles.bottomContainer}>
			<CustomButton onClick={() => handleConfirm(selectedCard)}>
				<h2>Confirm</h2>
			</CustomButton>

			<div className={styles.abilityHandContainer}>{abilityHandComponents}</div>
		</div>
	);
}

function CardComponent({selectedCard, onClick, index, abilityJSON}) {
	let style = {borderWidth: 10, borderStyle: "solid"};
	if (selectedCard === index) {
		style = {...style, borderColor: "white"};
	}

	return (
		<button style={style} onClick={onClick}>
			<AbilityComponent abilityJSON={abilityJSON} />
		</button>
	);
}
