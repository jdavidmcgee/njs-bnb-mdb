import LoadingCards from '@/components/card/LoadingCards';
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import { Suspense } from 'react';

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ category?: string; search?: string }>;
}) {
	const { category, search } = await Promise.resolve(searchParams);
	// console.log(`🙏 ~ HomePage ~ search:`, search);
	// console.log(`🙏 ~ HomePage ~ category:`, category);

	return (
		<section>
			<CategoriesList category={category} search={search} />
			<Suspense fallback={<LoadingCards />}>
				<PropertiesContainer category={category} search={search} />
			</Suspense>
		</section>
	);
}
