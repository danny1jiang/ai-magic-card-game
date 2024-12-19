import styles from "../css/home.module.css";

export function AbilityComponent({abilityJSON, imageComponent}) {
	let name = abilityJSON.name;
	let type = abilityJSON.type;
	let description = abilityJSON.description;
	let priority = abilityJSON.priority;
	let cost = abilityJSON.cost;
	let baseDamage = abilityJSON.baseDamage;

	return (
		<div className={styles.abilityComponent}>
			<h1>{name}</h1>
			{imageComponent}
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h2>Type: {type}</h2>
				<h2>Priority: {priority}</h2>
				<h2>Cost: {cost}</h2>
				<h2>Base Damage: {baseDamage}</h2>
			</div>
			<h2>{description}</h2>
		</div>
	);
}
