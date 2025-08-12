import axios from "axios";

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = process.env.ACCESS_KEY ?? "";

const getPhotos = async (searchQuery: string = "") => {
	try {
		const url = searchQuery
			? `${API_URL}/search/photos?query=${searchQuery}&client_id=${ACCESS_KEY}&per_page=30`
			: `${API_URL}/photos/random?client_id=${ACCESS_KEY}&count=30`;

		const response = await axios.get(url);
		return searchQuery ? response.data.results : response.data;
	} catch (err) {
		let errorMessage = "خطا: Failed to fetch photos.";

		if (axios.isAxiosError(err) && err.response?.status === 403) {
			errorMessage =
				"خطا: کلید دسترسی Unsplash شما نامعتبر است یا محدودیت استفاده از آن به پایان رسیده. لطفاً کلید را بررسی کنید یا یک کلید جدید دریافت کنید.";
		}

		console.error(err);
		throw new Error(errorMessage);
	}
};

export { getPhotos };
