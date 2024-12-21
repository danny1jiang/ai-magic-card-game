import {GameState} from "@/game/gameState";
import styles from "../game.module.css";
import {CustomButton} from "@/components/CustomButton";

export function GameEndComponent({show, onTryAgain}) {
	if (!show) return null;

	let text = "You have lost!";

	if (GameState.getEnemyHealth() <= 0) {
		text = "You have won!";
	}

	return (
		<div className={styles.gameEndComponent}>
			<h1>{text}</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					width: "30%",
					marginTop: "2%",
				}}
			>
				<CustomButton onClick={onTryAgain}>Try Again</CustomButton>
				<CustomButton type={"link"} href={"/"}>
					New Game
				</CustomButton>
			</div>
		</div>
	);
}
