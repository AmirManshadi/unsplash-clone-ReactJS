import { useState } from "react";
import "./style.css";
import {
	Header,
	SearchPhoto,
	Spinner,
	ImageCard,
	Error
} from "@/components";
import { usePhotos } from "@/hooks";

const Home = () => {
	const [query, setQuery] = useState<string>("");

	const { data, error, isLoading } = usePhotos(query);

	const handleSearch = (value: string) => setQuery(value);
	const handleClear = () => setQuery("");

	if (error) return <Error>{error}</Error>;

	return (
		<div className="bg-white min-h-screen p-4">
			<Header />
			<SearchPhoto
				searchQuery={query}
				onSearch={handleSearch}
				onClear={handleClear}
			/>

			{isLoading ? (
				<Spinner />
			) : (
				<div className="masonry-grid">
					{data.map(photo => (
						<ImageCard key={photo.id} photo={photo} />
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
