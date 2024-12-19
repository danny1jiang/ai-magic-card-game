export class GameState {
	static #maxMana = 10;

	static #playerHealth = 0;
	static #enemyHealth = 0;

	static #playerMana = this.#maxMana;
	static #enemyMana = this.#maxMana;

	// Getters
	static getPlayerHealth() {
		return this.#playerHealth;
	}

	static getEnemyHealth() {
		return this.#enemyHealth;
	}

	static getPlayerMana() {
		return this.#playerMana;
	}

	static getEnemyMana() {
		return this.#enemyMana;
	}

	static getMaxMana() {
		return this.#maxMana;
	}

	// Setters
	static setPlayerHealth(health) {
		this.#playerHealth = health;
	}

	static setEnemyHealth(health) {
		this.#enemyHealth = health;
	}

	static setPlayerMana(mana) {
		this.#playerMana = mana;
	}

	static setEnemyMana(mana) {
		this.#enemyMana = mana;
	}

	static initializeGameState(playerJSON, enemyJSON) {
		this.#playerHealth = playerJSON.health;
		this.#enemyHealth = enemyJSON.health;
		this.#playerMana = this.#maxMana;
		this.#enemyMana = this.#maxMana;
	}
}
