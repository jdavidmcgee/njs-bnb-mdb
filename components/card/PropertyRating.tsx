import { FaStar } from 'react-icons/fa';

export default function PropertyRating({
	propertyId,
	inPage,
}: {
	propertyId: string;
	inPage: boolean;
}) {
	// temporary hardcoded data
	const rating = 4.5;
	const count = 100;

	const className = `flex gap-1 items-center ${
		inPage ? 'text-md' : 'text-xs'
	}`;
	const countText = count > 1 ? `reviews` : `review`;
	const countValue = `(${count}) ${inPage ? countText : ''}`;

	return (
		<span className={className}>
			<FaStar className="w-3 h-3" />
			{rating} {countValue}
		</span>
	);
}
