"use server";

export async function loadImages(characterJSON, enemyJSON) {
	let url =
		"https://image.pollinations.ai/prompt/" +
		characterJSON.imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	let status = -1;
	while (status !== 200) {
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
		});
		status = response.status;
		console.log(response);
	}

	url =
		"https://image.pollinations.ai/prompt/" +
		enemyJSON.imagePrompt +
		"?width=256&height=256&model=flux&seed=42&nologo=true";

	status = -1;
	while (status !== 200) {
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
		});
		status = response.status;
		console.log(response);
	}

	let abilities = [...characterJSON.abilities, ...enemyJSON.abilities];
	for (let i = 0; i < abilities.length; i++) {
		let imagePrompt = abilities[i].imagePrompt;

		const url =
			"https://image.pollinations.ai/prompt/" +
			imagePrompt +
			"?width=256&height=256&model=flux&seed=42&nologo=true";

		console.log(imagePrompt);

		let status = -1;
		while (status !== 200) {
			let response = await fetch(url, {
				method: "GET",
				mode: "cors",
			});
			status = response.status;
			console.log(response);
		}
	}
}
