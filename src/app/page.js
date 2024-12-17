"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {CharacterSelectionList} from "@/components/CharacterSelection";
import ReactModal from "react-modal";
import {useEffect, useState} from "react";
import {BackButton} from "@/components/BackButton";

export default function Home() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		ReactModal.setAppElement("#appElement");
	}, []);

	function handleCharacterClick(characterJSON) {
		console.log(characterJSON);
		setShowModal(true);
	}

	return (
		<div id="appElement" className={styles.page}>
			<ReactModal
				isOpen={showModal}
				style={{
					overlay: {
						alignItems: "center",
						backgroundColor: "rgb(0,0,0,0.3)",
					},
					content: {
						width: "80%",
						height: "80%",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						padding: 0,
						border: "none",
						backgroundColor: "#ffffff",
						borderRadius: "10px",
						scrollbarColor: "#a3a3a3 rgb(0,0,0,0)",
					},
				}}
			>
				<BackButton
					onClick={() => {
						setShowModal(false);
						setModalContent("");
					}}
				/>
			</ReactModal>

			<main className={styles.main}>
				<h1>Select a Character</h1>

				<CharacterSelectionList onClick={handleCharacterClick} />

				<div className={styles.ctas}>
					<a
						className={styles.primary}
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							className={styles.logo}
							src="/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Deploy now
					</a>
					<a
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.secondary}
					>
						Read our docs
					</a>
				</div>
			</main>
			<footer className={styles.footer}>
				<a
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
					Learn
				</a>
				<a
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
					Examples
				</a>
				<a
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
