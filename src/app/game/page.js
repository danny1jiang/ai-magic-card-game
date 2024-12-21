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
import ReactModal from "react-modal";
import {AbilityComponent} from "@/components/AbilityComponent";
import {PlayedCards} from "./components/PlayedCards";
import {ChatComponent} from "./components/ChatComponent";
import ProgressBar from "@ramonak/react-progress-bar";

export default function GamePage() {
	const [initialized, setInitialized] = useState(false);
	const [playerActions, setPlayerActions] = useState();
	const [enemyActions, setEnemyActions] = useState();
	const [showModal, setShowModal] = useState(false);

	const [playerState, setPlayerState] = useState({});
	const [enemyState, setEnemyState] = useState({});

	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		initializeActionAI();
		initializeEnemyAI(getEnemyJSON());
		setupEnemyHand(getEnemyJSON().abilities);
		GameState.initializeGameState(getCharacterJSON(), getEnemyJSON());
		setPlayerState({health: GameState.getPlayerHealth(), mana: GameState.getPlayerMana()});
		setEnemyState({health: GameState.getEnemyHealth(), mana: GameState.getEnemyMana()});
		setInitialized(true);
	}, []);

	function setPlayerPlayedCards(playerActions) {
		setPlayerActions(playerActions);
		setShowModal(true);
	}

	function setEnemyPlayedCards(enemyActions) {
		setEnemyActions(enemyActions);
	}

	function closeModal() {
		setShowModal(false);
		setEnemyActions(undefined);
		setPlayerActions(undefined);
	}

	function onRoundEnd(resultJSON) {
		let playerState = {health: 0, mana: 0};
		let enemyState = {health: 0, mana: 0};

		playerState.health = GameState.getPlayerHealth();
		playerState.mana = GameState.getPlayerMana();

		enemyState.health = GameState.getEnemyHealth();
		enemyState.mana = GameState.getEnemyMana();

		setPlayerState(playerState);
		setEnemyState(enemyState);

		setChatMessages([...chatMessages, resultJSON.description]);
	}

	if (!initialized) return null;

	let characterJSON = getCharacterJSON();
	let enemyJSON = getEnemyJSON();

	return (
		<div id="gamePage" className={styles.gameContainer}>
			<PlayedCards
				show={showModal}
				closeModal={closeModal}
				playerPlayedCards={playerActions}
				enemyPlayedCards={enemyActions}
			/>
			<AbilityHand
				abilityJSONList={characterJSON.abilities}
				setPlayerPlayedCards={setPlayerPlayedCards}
				setEnemyPlayedCards={setEnemyPlayedCards}
				onRoundEnd={onRoundEnd}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					flex: 0.6,
				}}
			>
				<div style={inlineStyles.characterContainer}>
					<div style={inlineStyles.divSeparation}>
						<h1>{characterJSON.name}</h1>
						<CharacterComponent characterJSON={characterJSON} />
					</div>

					<ProgressBar
						isLabelVisible={false}
						completed={(playerState.health / characterJSON.health) * 100}
						width="25vh"
						bgColor="#d94747"
						baseBgColor="#9b9b9b"
					/>
					<h2>{playerState.health}</h2>
					<h2>{playerState.mana}</h2>
				</div>
				<ChatComponent chatMessages={chatMessages} />
				<div style={inlineStyles.characterContainer}>
					<div style={inlineStyles.divSeparation}>
						<h1>{enemyJSON.name}</h1>
						<CharacterComponent characterJSON={enemyJSON} />
					</div>
					<ProgressBar
						isLabelVisible={false}
						completed={(enemyState.health / enemyJSON.health) * 100}
						width="25vh"
						bgColor="#d94747"
						baseBgColor="#9b9b9b"
					/>
					<h2>{enemyState.health}</h2>
					<h2>{enemyState.mana}</h2>
				</div>
			</div>
		</div>
	);
}

const inlineStyles = {
	characterContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: 0.2,
		flexDirection: "column",
	},
	divSeparation: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		margin: "1.5vh",
	},
};
