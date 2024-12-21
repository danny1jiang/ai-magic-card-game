import {getPlayerHand, playActions, setupPlayerHand} from "@/game/playerHandInfo";
import styles from "../game.module.css";
import {useEffect, useState} from "react";
import {AbilityComponent} from "@/components/AbilityComponent";
import {CustomButton} from "@/components/CustomButton";
import {GameState} from "@/game/gameState";
import goldenRim from "../../../assets/goldenRim.png";
import {ManaCountComponent} from "./ManaCountComponent";

export function AbilityHand({hasWon, setPlayerPlayedCards, setEnemyPlayedCards, onRoundEnd}) {
	const [currentHand, setCurrentHand] = useState([]);
	const [abilityHandComponents, setAbilityHandComponents] = useState([]);
	const [selectedCards, setSelectedCards] = useState([]);
	const [manaCount, setManaCount] = useState(GameState.getMaxMana());
	const [manaCost, setManaCost] = useState(0);

	useEffect(() => {
		setCurrentHand([...getPlayerHand()]);
		if (hasWon === false) {
			setManaCount(GameState.getMaxMana());
			setManaCost(0);
		}
	}, [hasWon]);

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
					currentMana={manaCount}
					totalManaCost={manaCost}
				/>
			);
		}
		setAbilityHandComponents(abilityHandComponents);
	}, [currentHand, selectedCards, manaCount]);

	async function handleConfirm(selectedCards) {
		let playerPlayedCards = [];
		let manaCost = 0;
		for (let i = 0; i < selectedCards.length; i++) {
			playerPlayedCards.push(currentHand[selectedCards[i]]);
			manaCost += currentHand[selectedCards[i]].cost;
		}

		if (manaCost !== 0 && manaCost > GameState.getPlayerMana()) return;

		setPlayerPlayedCards(playerPlayedCards);
		let promise = playActions(selectedCards);
		setCurrentHand([...getPlayerHand()]);
		setSelectedCards([]);
		setManaCost(0);
		setManaCount(manaCount - manaCost);

		let {playerActions, enemyActions, resultJSON} = await promise;
		setManaCount(Math.min(GameState.getMaxMana(), manaCount - manaCost + 2));
		setEnemyPlayedCards(enemyActions);
		onRoundEnd(resultJSON);
	}

	function handleSelect(num) {
		if (selectedCards.includes(num)) {
			let tempSelectedCards = [...selectedCards];
			tempSelectedCards.splice(tempSelectedCards.indexOf(num), 1);
			setSelectedCards(tempSelectedCards);
			setManaCost(manaCost - currentHand[num].cost);
		} else {
			setSelectedCards([...selectedCards, num]);
			setManaCost(manaCost + currentHand[num].cost);
		}
	}

	return (
		<div className={styles.bottomContainer}>
			<img
				style={{position: "absolute", top: "-5%", zIndex: 0}}
				src={goldenRim.src}
				width={"100%"}
				height={"200%"}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					zIndex: 1,
					justifyContent: "space-evenly",
					width: "100%",
					height: "100%",
				}}
			>
				<div className={styles.handAdjacentContainer}>
					<ManaCountComponent manaCount={manaCount} manaCost={manaCost} />
				</div>

				<div className={styles.abilityHandContainer}>{abilityHandComponents}</div>
				<div className={styles.handAdjacentContainer}>
					<CustomButton onClick={() => handleConfirm(selectedCards)}>
						<h2>Confirm</h2>
					</CustomButton>
				</div>
			</div>
		</div>
	);
}

function CardComponent({index, isSelected, onClick, abilityJSON, currentMana, totalManaCost}) {
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
		transition: "all 0.15s ease-out",
	};
	if (isSelected) {
		style = {...style, position: "relative", bottom: bottom + 10 + "%", zIndex: 1};
	}

	if (!isSelected && totalManaCost + abilityJSON.cost > currentMana) {
		style = {...style, filter: "grayscale(100%)"};
		onClick = () => {};
	}

	return (
		<div style={style} onClick={onClick}>
			<AbilityComponent showBack={isSelected} abilityJSON={abilityJSON} />
		</div>
	);
}
