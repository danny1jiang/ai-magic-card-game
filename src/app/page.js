"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {CharacterInfoModal, CharacterSelectionList} from "@/components/CharacterSelection";
import ReactModal from "react-modal";
import {useEffect, useState} from "react";
import {BackButton} from "@/components/BackButton";
import {
	addCharacterJSONToDatabase,
	getDatabaseCharacterIndex,
	getDatabaseCharacterJSON,
	setDatabaseCharacterIndex,
} from "@/firebase";
import {setCharacterJSON, setEnemyJSON} from "@/game/gameInfo";
import {generateCharacters} from "@/ai/characterGenerationAI";
import {loadImages} from "@/utils/imageUtils";
import {CustomButton} from "@/components/CustomButton";
import magicalLandscape from "../assets/magicalLandscape.jpg";

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [stringJSON, setStringJSON] = useState("");
	const [loadedChar, setLoadedChar] = useState(false);

	useEffect(() => {
		ReactModal.setAppElement("#appElement");
		getDatabaseCharacterJSON().then(({playerJSON, enemyJSON}) => {
			setEnemyJSON(enemyJSON);
			setCharacterJSON(playerJSON);
			setLoadedChar(true);
		});
		generateCharacters(2).then((characterJSONString) => {
			let json = JSON.parse(characterJSONString);

			let enemyJSON = json.characters[0];
			json.characters.splice(0, 1);

			loadImages(json.characters[0], enemyJSON);
			addCharacterJSONToDatabase(json.characters[0], enemyJSON);
		});
		setDatabaseCharacterIndex(getDatabaseCharacterIndex() + 1);
		//setDatabaseCharacterIndex(6);
		//window.localStorage.clear();
	}, []);

	function handleCharacterClick(stringJSON) {
		setStringJSON(stringJSON);
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
					}}
				/>
				<CharacterInfoModal stringJSON={stringJSON} />
			</ReactModal>

			<main className={styles.main}>
				{loadedChar ? (
					<div>
						<div className={styles.background} />
						<div className={styles.fadeInUpAnimation}>
							<h1 style={{zIndex: "inherit"}}>Your Character</h1>

							<div
								style={{
									filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.3))",
									zIndex: "inherit",
								}}
							>
								<CharacterSelectionList onClick={() => {}} />
							</div>
							<div style={{marginTop: "5%", zIndex: "inherit"}}>
								<CustomButton type={"link"} href="/game">
									<h3>Play</h3>
								</CustomButton>
							</div>
						</div>
					</div>
				) : null}
			</main>
		</div>
	);
}
