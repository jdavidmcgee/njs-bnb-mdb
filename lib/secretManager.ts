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
const client = new SecretManagerServiceClient({
	credentials: JSON.parse(credentialsJson),
});


/**
 * Retrieves the latest version of a secret.
 * @param secretName The name of the secret (without version)
 * @returns The secret payload as a string.
 */
export async function getSecret(secretName: string): Promise<string> {
	// Construct the resource name of the secret version.
	// It will look like: projects/<PROJECT_ID>/secrets/<SECRET_NAME>/versions/latest
	const name = `projects/${process.env.GCLOUD_PROJECT_ID}/secrets/${secretName}/versions/latest`;

	const [version] = await client.accessSecretVersion({ name });

	if (!version.payload || !version.payload.data) {
		throw new Error('Secret payload is empty');
	}

	const payload = version.payload.data.toString();
	return payload;
}
