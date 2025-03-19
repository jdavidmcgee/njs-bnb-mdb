import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';

export default function CreatePropertyPage() {
	return (
		<section>
			<h1 className="text-2xl font-semibold mb-8 capitalize">
				Create Property
			</h1>
			<div className="border p-8 rounded-md">
				<h3 className="text-lg mb-4 font-medium">General Information:</h3>
				<FormContainer action={createPropertyAction}>
					<div className="grid md:grid-cols-2 gap-8 mb-4">
						<FormInput
							name="name"
							type="text"
							label="Name (Between 2 - 100 characters)"
							defaultValue="Cabin in the US"
						/>
						<FormInput
							name="tagline"
							type="text"
							label="Tagline (Between 2 - 100 characters)"
							defaultValue="This dream vacation is waiting for you!"
						/>
						{/* price */}
						<PriceInput />
						{/* categories */}
						<CategoriesInput />
					</div>
					{/* text area / description */}
					<TextAreaInput
						name="description"
						labelText="Description (10 - 1000 Words)"
					/>
					{/* countries input and image input */}
					<div className="grid sm:grid-cols-2 gap-8 mt-4">
						<CountriesInput />
						<ImageInput />
					</div>
					{/* counter inputs */}
					<h3 className="text-lg mt-8 mb-6 font-medium">
						Accommodation Details:
					</h3>
					<CounterInput detail="guests" />
					<CounterInput detail="bedrooms" />
					<CounterInput detail="beds" />
					<CounterInput detail="baths" />
					{/* amenities input */}
					<h3 className="text-lg mt-10 mb-6 font-medium">Amenities:</h3>
					<AmenitiesInput />
					<SubmitButton text="create rental" className="mt-12" />
				</FormContainer>
			</div>
		</section>
	);
}
