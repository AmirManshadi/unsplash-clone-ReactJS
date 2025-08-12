import { useEffect, useState } from "react";
import { getPhotos } from "@/services";

interface Photo {
	id: string;
	urls: {
		regular: string;
	};
	alt_description: string;
}

const usePhotos = (query: string) => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		getPhotos(query)
			.then(data => setPhotos(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [query]);

	return { data: photos, isLoading: loading, error };
};

export { usePhotos };
