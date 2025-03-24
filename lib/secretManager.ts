// lib/secretManager.ts
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient({
	credentials: JSON.parse(
		process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON as string
	),
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
