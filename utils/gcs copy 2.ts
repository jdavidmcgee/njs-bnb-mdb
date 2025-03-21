// lib/gcs.ts
import { Storage } from '@google-cloud/storage';


const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT_ID,
	keyFilename: process.env.GCLOUD_KEYFILE_PATH, // Alternatively, set GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = process.env.GCS_BUCKET_NAME as string;
const bucket = storage.bucket(bucketName);

/**
 * Uploads an image to Google Cloud Storage and returns its public URL.
 * @param image A File object (from a Next.js server action or API route)
 */
export const uploadImage = async (image: File): Promise<string> => {
	// Create a unique name for the image
	const timestamp = Date.now();
	const newName = `${timestamp}-${image.name}`;

	// Convert the File (a Blob in Node) to a Buffer
	const fileBuffer = Buffer.from(await image.arrayBuffer());

	// Get a reference to the destination file in the bucket
	const fileUpload = bucket.file(newName);

	// Upload the file buffer to GCS
	await fileUpload.save(fileBuffer, {
		metadata: { contentType: image.type },
		public: true, // Makes the file publicly accessible
		resumable: false, // For smaller files, non-resumable is simpler
	});

	// Return the public URL of the uploaded image
	return `https://storage.googleapis.com/${bucketName}/${newName}`;
};
