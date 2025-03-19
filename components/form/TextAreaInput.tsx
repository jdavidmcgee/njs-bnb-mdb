import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
	name: string;
	labelText?: string;
	defaultValue?: string;
};

export default function TextAreaInput({
	name,
	labelText,
	defaultValue,
}: TextAreaInputProps) {
	return (
		<div>
			<Label htmlFor={name} className="capitalize">
				{labelText || name}
			</Label>
			<Textarea
				id={name}
				name={name}
				defaultValue={defaultValue || tempDefaultDescription}
				rows={5}
				required
				className="leading-loose"
			/>
		</div>
	);
}

const tempDefaultDescription =
	'This is a beautiful property located in nature. There are a bunch of amenities that will make this a memorable stay for you and your family. The property is located near the beach and has a beautiful view of the ocean. You will love the sunsets here! The property is also located near a bunch of restaurants and shops. Come and enjoy your stay here!';
