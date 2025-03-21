/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();

const rawKeyJson = process.env.GCLOUD_KEYFILE_JSON;

// Optionally, log the first few characters to diagnose issues:
console.log('First character:', rawKeyJson ? rawKeyJson[0] : 'undefined');

const keyJson =
	rawKeyJson && rawKeyJson.startsWith('"') && rawKeyJson.endsWith('"')
		? rawKeyJson.slice(1, -1)
		: rawKeyJson;

try {
	const creds = JSON.parse(keyJson);
	console.log('Parsed credentials:', creds);
} catch (error) {
	console.error('Error parsing credentials:', error);
}