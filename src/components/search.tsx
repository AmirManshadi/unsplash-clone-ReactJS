import { useRef } from "react";

interface SearchPhotoProps {
	searchQuery: string;
	onSearch: (value: string) => void;
	onClear: () => void;
}

function SearchPhoto({ searchQuery, onSearch, onClear }: SearchPhotoProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const { current } = inputRef;
		if (current) onSearch(current.value);
	};

	const handleClear = () => {
		const { current } = inputRef;
		if (current) current.focus();
		onClear();
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="text"
				ref={inputRef}
				value={searchQuery}
				placeholder="جستجوی عکس..."
				className="flex-grow p-3 rounded-lg border border-slate-200 bg-gray-50 text-black placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
				onChange={e => onSearch(e.target.value)}
			/>

			<button
				type="submit"
				className=" p-3 rounded-lg border border-slate-200 bg-gray-200 text-black transition-colors hover:cursor-pointer hover:shadow-md "
			>
				جستجو
			</button>

			{searchQuery && (
				<button
					type="button"
					className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-200 transition-colors"
					onClick={handleClear}
				>
					پاک کردن
				</button>
			)}
		</form>
	);
}

export default SearchPhoto;
