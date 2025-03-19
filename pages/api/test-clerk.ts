//import { clerkClient } from '@clerk/nextjs/server';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		// Replace 'user-id' with an actual Clerk user ID
// 		const user = await clerkClient.users.getUser(
// 			'user_2qfBtMpir7XTXLC2a1JiFomjyI3'
// 		);
// 		console.log('Clerk User:', user);
// 		res.status(200).json(user);
// 	} catch (error) {
// 		console.error('Error:', error);
// 		res.status(500).json({ error: error.message });
// 	}
// }

// export default async function handler(req, res) {
// 	try {
// 		console.log('Clerk Client:', clerkClient); // Log the full clerkClient object
// 		res.status(200).json({ message: 'Check your logs' });
// 	} catch (error) {
// 		console.error('Error:', error);
// 		res.status(500).json({ error: error.message });
// 	}
// }

import { createClerkClient } from '@clerk/nextjs/server';

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(req, res) {
	try {
		const user = await clerkClient.users.getUser(
			'user_2qfBtMpir7XTXLC2a1JiFomjyI3'
		);
		console.log('Clerk User:', user);
		res.status(200).json(user);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: error.message });
	}
}
