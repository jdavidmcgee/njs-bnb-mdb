// lib/gcs.ts
import { Storage } from '@google-cloud/storage';
import { getSecret } from '../lib/secretManager';

async function initializeStorage() {
	if (!process.env.GCLOUD_PROJECT_ID) {
		throw new Error('Missing GCLOUD_PROJECT_ID environment variable');
	}
	if (!process.env.GCS_BUCKET_NAME) {
		throw new Error('Missing GCS_BUCKET_NAME environment variable');
	}

	// Retrieve the secret from Secret Manager.
	// Assuming your secret's name is 'gcloud-keyfile-json'
	const keyJson = await getSecret('gcloud-keyfile-json');

	const storage = new Storage({
		projectId: process.env.GCLOUD_PROJECT_ID,
		credentials: JSON.parse(keyJson),
	});

	const bucketName = process.env.GCS_BUCKET_NAME;
	const bucket = storage.bucket(bucketName);

	return { storage, bucket };
}

/**
 * Uploads an image to Google Cloud Storage and returns its public URL.
 * @param image A File object (from a Next.js server action or API route)
 */
export const uploadImage = async (image: File): Promise<string> => {
	const { bucket } = await initializeStorage();

	const timestamp = Date.now();
	const newName = `${timestamp}-${image.name}`;

	// Convert the File (a Blob in Node) to a Buffer
	const fileBuffer = Buffer.from(await image.arrayBuffer());

	// Get a reference to the destination file in the bucket
	const fileUpload = bucket.file(newName);

	// Upload the file buffer to GCS
	await fileUpload.save(fileBuffer, {
		metadata: { contentType: image.type },
		public: true,
		resumable: false,
	});

	return `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${newName}`;
};