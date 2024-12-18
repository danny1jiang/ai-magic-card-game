import styles from "../css/home.module.css";

export function CustomButton({onClick, color, children}) {
	return (
		<button onClick={onClick} className={styles.customButton} style={{backgroundColor: color}}>
			{children}
		</button>
	);
}
