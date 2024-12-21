import {GameState} from "@/game/gameState";
import manaCrystal from "../../../assets/manaCrystal.png";
import styles from "../game.module.css";

export function ManaCountComponent({manaCount, manaCost}) {
	let manaCrystals = [];
	for (let i = 0; i < manaCount; i++) {
		if (manaCount - i > manaCost) {
			manaCrystals.push(
				<img
					key={i}
					style={{filter: "drop-shadow(0px 5px 5px rgb(0,0,0,0.3))"}}
					src={manaCrystal.src}
					alt="Mana Crystal"
					width={"100%"}
				/>
			);
		} else {
			manaCrystals.push(
				<img
					style={{
						position: "relative",
						//filter: "drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white)",
						filter: "drop-shadow(0px 5px 5px rgb(0,0,0,0.3)) brightness(1.3)",
						bottom: "20%",
					}}
					key={i}
					src={manaCrystal.src}
					alt="Mana Crystal"
					width={"100%"}
				/>
			);
		}
	}
	for (let i = 0; i < GameState.getMaxMana() - manaCount; i++) {
		manaCrystals.push(
			<img
				key={manaCount + i}
				style={{
					filter: "drop-shadow(0px 5px 5px rgb(0,0,0,0.3))",
					opacity: 0.3,
				}}
				src={manaCrystal.src}
				alt="Mana Crystal"
				width={"100%"}
			/>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				color: "white",
				fontSize: "3vh",
			}}
		>
			<h1>Mana</h1>
			<div className={styles.manaCountComponent}>{manaCrystals}</div>
		</div>
	);
}
