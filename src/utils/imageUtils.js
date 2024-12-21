export function loadImages(characterJSON, enemyJSON) {
	let url =
		"https://image.pollinations.ai/prompt/" +
		characterJSON.imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	fetch(url, {
		method: "GET",
		mode: "cors",
	}).then((response) => console.log(response));

	url =
		"https://image.pollinations.ai/prompt/" +
		enemyJSON.imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	fetch(url, {
		method: "GET",
		mode: "cors",
	}).then((response) => console.log(response));

	let abilities = [...characterJSON.abilities, ...enemyJSON.abilities];
	for (let i = 0; i < abilities.length; i++) {
		let imagePrompt = abilities[i].imagePrompt;

		const url =
			"https://image.pollinations.ai/prompt/" +
			imagePrompt +
			"?width=256&height=256&model=flux&seed=42&nologo=true";

		console.log(imagePrompt);

		fetch(url, {
			method: "GET",
			mode: "cors",
		}).then((response) => console.log(response));
	}
}
