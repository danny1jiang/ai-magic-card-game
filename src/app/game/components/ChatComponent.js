import styles from "../game.module.css";

export function ChatComponent({chatMessagesJSON}) {
	let chatChunks = [];

	console.log(chatMessagesJSON);

	for (let i = 0; i < chatMessagesJSON.length; i++) {
		chatChunks.push(<ChatChunkComponent key={i} index={i} json={chatMessagesJSON[i]} />);
	}

	return <div className={styles.chatComponent}>{chatChunks}</div>;
}

function ChatChunkComponent({json, index}) {
	let message = json.description;
	let playerDamage = json.player.damageTaken;
	let enemyDamage = json.enemy.damageTaken;

	return (
		<div
			style={{
				margnTop: "20px",
				marginBottom: "20px",
				marginLeft: "10px",
				marginRight: "10px",
			}}
		>
			<div
				style={{
					backgroundColor: "#32373d",
					borderRadius: "10px",
					padding: "2%",
				}}
			>
				<h1>Round {index + 1}</h1>
				<h2
					style={{
						marginTop: "15px",
						marginBottom: "7.5px",
						fontWeight: "normal",
						color: "#e1e1e1",
					}}
				>
					{message}
				</h2>
				<div>
					<h2>Player Damage Taken: {playerDamage}</h2>
					<h2>Enemy Damage Taken: {enemyDamage}</h2>
				</div>
			</div>
		</div>
	);
}
