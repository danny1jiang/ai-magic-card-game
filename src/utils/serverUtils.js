"use server";

export async function getAPIKey() {
	return process.env.REACT_APP_API_KEY;
}
