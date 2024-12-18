import backButton from "../assets/backButton.png";
import styles from "../css/home.module.css";

export function BackButton({onClick}) {
	return (
		<button className={styles.backButton} onClick={onClick}>
			<img src={backButton.src} alt="Back" width={"60%"} />
		</button>
	);
}
