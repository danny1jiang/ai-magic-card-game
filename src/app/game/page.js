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
import {GameEndComponent} from "./components/GameEndComponent";
import {setupPlayerHand} from "@/game/playerHandInfo";

export default function GamePage() {
	const [initialized, setInitialized] = useState(false);
	const [playerActions, setPlayerActions] = useState();
	const [enemyActions, setEnemyActions] = useState();
	const [showModal, setShowModal] = useState(false);
	const [hasWon, setHasWon] = useState(false);

	const [playerState, setPlayerState] = useState({});
	const [enemyState, setEnemyState] = useState({});

	const [chatMessagesJSON, setChatMessagesJSON] = useState([]);

	useEffect(() => {
		initializeGame();
	}, []);

	function initializeGame() {
		setChatMessagesJSON([]);
		initializeActionAI();
		initializeEnemyAI(getEnemyJSON());
		setupEnemyHand(getEnemyJSON().abilities);
		setupPlayerHand(getCharacterJSON().abilities);
		GameState.initializeGameState(getCharacterJSON(), getEnemyJSON());
		setPlayerState({health: GameState.getPlayerHealth(), mana: GameState.getPlayerMana()});
		setEnemyState({health: GameState.getEnemyHealth(), mana: GameState.getEnemyMana()});
		setInitialized(true);
	}

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

		if (GameState.getPlayerHealth() <= 0 || GameState.getEnemyHealth() <= 0) {
			setHasWon(true);
		}
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

		setChatMessagesJSON([...chatMessagesJSON, resultJSON]);
	}

	if (!initialized) return null;

	let characterJSON = getCharacterJSON();
	let enemyJSON = getEnemyJSON();

	function handleTryAgain() {
		setHasWon(false);
		initializeGame();
	}

	return (
		<div id="gamePage" className={styles.gameContainer}>
			<GameEndComponent show={hasWon} onTryAgain={handleTryAgain} />
			<PlayedCards
				show={showModal}
				closeModal={closeModal}
				playerPlayedCards={playerActions}
				enemyPlayedCards={enemyActions}
			/>
			<AbilityHand
				hasWon={hasWon}
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
						<CharacterComponent characterJSON={characterJSON} onClick={() => {}} />
					</div>

					<HealthBarComponent state={playerState} json={characterJSON} />
				</div>
				<ChatComponent chatMessagesJSON={chatMessagesJSON} />
				<div style={inlineStyles.characterContainer}>
					<div style={inlineStyles.divSeparation}>
						<h1>{enemyJSON.name}</h1>
						<CharacterComponent characterJSON={enemyJSON} onClick={() => {}} />
					</div>

					<HealthBarComponent state={enemyState} json={enemyJSON} />
				</div>
			</div>
		</div>
	);
}

function HealthBarComponent({state, json}) {
	return (
		<div
			style={{
				width: "25vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h2>HP: {Math.round(state.health)}</h2>
			<ProgressBar
				isLabelVisible={false}
				completed={(state.health / json.health) * 100}
				width={"25vh"}
				bgColor="#bd3a3a"
				baseBgColor="#2a2d2f"
			/>
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
		backgroundColor: "#32373d",
		color: "white",
	},
	divSeparation: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		margin: "1.5vh",
	},
};
