import styles from "../game.module.css";

export function ChatComponent({chatMessages}) {
	let chatChunks = [];

	console.log(chatMessages);

	for (let i = 0; i < chatMessages.length; i++) {
		chatChunks.push(<ChatChunkComponent key={i} message={chatMessages[i]} />);
	}

	return <div className={styles.chatComponent}>{chatChunks}</div>;
}

function ChatChunkComponent({message}) {
	return (
		<div style={{margin: "10px"}}>
			<h2>{message}</h2>
		</div>
	);
}
