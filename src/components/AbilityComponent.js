import {useState} from "react";
import styles from "../css/home.module.css";
import cardBorder from "../assets/cardBorder.png";

export function AbilityComponent({abilityJSON, showBack}) {
	let name = abilityJSON.name;
	let type = abilityJSON.type;
	let description = abilityJSON.description;
	let priority = abilityJSON.priority;
	let cost = abilityJSON.cost;
	let baseDamage = abilityJSON.baseDamage;
	const url =
		"https://image.pollinations.ai/prompt/" +
		abilityJSON.imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	return (
		<div className={styles.abilityComponent}>
			<img
				style={{
					position: "absolute",
					pointerEvents: "none",
					zIndex: 1,
					filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.3))",
				}}
				width={"97%"}
				src={cardBorder.src}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					textAlign: "center",
					position: "absolute",
					zIndex: 1,
					bottom: 0,
					height: "30%",
					fontSize: "1vh",
				}}
			>
				<h2>{name}</h2>
				<h2>Type: {type}</h2>
			</div>
			<div
				style={{
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					left: 0,
					top: "-1.5vh",
					width: "6vh",
					aspectRatio: 1,
					zIndex: 1,
					color: "white",
					textShadow: "0px 2px 1px black",
					fontSize: "2vh",
				}}
			>
				<h1>{cost}</h1>
			</div>
			{!showBack ? (
				<AbilityMainComponent imageURL={url} />
			) : (
				<AbilityInfoComponent
					type={type}
					priority={priority}
					cost={cost}
					baseDamage={baseDamage}
					description={description}
				/>
			)}
		</div>
	);
}

function AbilityMainComponent({imageURL}) {
	return (
		<div
			style={{
				display: "flex",
				position: "absolute",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				height: "100%",
				top: 0,
				zIndex: 0,
			}}
		>
			<img
				style={{
					position: "absolute",
					top: "8%",
					objectFit: "cover",
					pointerEvents: "none",
					userSelect: "none",
					zIndex: 1,
					outline: "rgb(0,0,0,0.5) solid 1.5vh",
				}}
				src={imageURL}
				alt="Ability"
				width={"76%"}
			/>
			<img
				style={{
					position: "absolute",
					objectFit: "cover",
					pointerEvents: "none",
					userSelect: "none",
					top: 0,
				}}
				src={imageURL}
				alt="Ability"
				width={"80%"}
				height={"70%"}
			/>
		</div>
	);
}

function AbilityInfoComponent({type, priority, cost, baseDamage, description}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				position: "absolute",
				top: 0,
				width: "85%",
				height: "75%",
				padding: "10%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				background: "radial-gradient(#eae7df, #dbd1bf)",
				fontSize: "1vh",
			}}
		>
			<h2>Priority: {priority}</h2>
			<h2>Base Damage: {baseDamage}</h2>
			<h2>{description}</h2>
		</div>
	);
}
