import Link from "next/link";
import styles from "../css/home.module.css";

export function CustomButton({type, href, onClick, color, children}) {
	if (type === "link") {
		return (
			<Link onClick={onClick} className={styles.customButton} href={href}>
				{children}
			</Link>
		);
	}
	return (
		<button onClick={onClick} className={styles.customButton} style={{backgroundColor: color}}>
			{children}
		</button>
	);
}
