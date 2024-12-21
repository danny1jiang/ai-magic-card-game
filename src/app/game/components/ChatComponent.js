import styles from "../game.module.css";

export function ChatComponent({chatMessagesJSON}) {
	let chatChunks = [];

	console.log(chatMessagesJSON);

	for (let i = 0; i < chatMessagesJSON.length; i++) {
		chatChunks.push(<ChatChunkComponent key={i} json={chatMessagesJSON[i]} />);
	}

	return <div className={styles.chatComponent}>{chatChunks}</div>;
}

function ChatChunkComponent({json}) {
	let message = json.description;
	let playerDamage = json.player.damageTaken;
	let enemyDamage = json.enemy.damageTaken;

	return (
		<div style={{marginBottom: "20px"}}>
			<h2>{message}</h2>
			<h2>
				Player Damage Taken: {playerDamage} Enemy Damage Taken: {enemyDamage}
			</h2>
		</div>
	);
}
