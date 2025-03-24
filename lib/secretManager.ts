// lib/secretManager.ts
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
	throw new Error(
		'Missing GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable'
	);
}
if (!process.env.GCLOUD_PROJECT_ID) {
	throw new Error('Missing GCLOUD_PROJECT_ID environment variable');
}

const credentialsJson = (
	process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string
).trim();
console.log(
	'DEBUG: GOOGLE_APPLICATION_CREDENTIALS_JSON exists:',
	!!credentialsJson
);
console.log('DEBUG: First 20 characters:', credentialsJson.substring(0, 20));

const client = new SecretManagerServiceClient({
	projectId: process.env.GCLOUD_PROJECT_ID, // Added explicit projectId
	credentials: JSON.parse(credentialsJson),
});

/**
 * Retrieves the latest version of a secret.
 * @param secretName The name of the secret (without version)
 * @returns The secret payload as a string.
 */
export async function getSecret(secretName: string): Promise<string> {
	// Construct the resource name of the secret version.
	const name = `projects/${process.env.GCLOUD_PROJECT_ID}/secrets/${secretName}/versions/latest`;
	const [version] = await client.accessSecretVersion({ name });
	if (!version.payload || !version.payload.data) {
		throw new Error('Secret payload is empty');
	}
	return version.payload.data.toString(); // Defaults to UTF-8
}
