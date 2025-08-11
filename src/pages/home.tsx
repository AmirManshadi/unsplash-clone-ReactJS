import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./home.css";
import Header from "../components/header";
import ImageCard from "../components/imageCard";
import Spinner from "../components/loadingSpinner";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCESS_KEY = "UzgMDFGpjXG24hZaYfWYlrpn06hBuz50ACfWnfOGuvI";

  const fetchPhotos = async (searchQuery: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = searchQuery
        ? `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${ACCESS_KEY}&per_page=30`
        : `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=30`;

      const response = await axios.get(url);

      const newPhotos = searchQuery ? response.data.results : response.data;

      setPhotos(newPhotos);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError(
          "خطا: کلید دسترسی Unsplash شما نامعتبر است یا محدودیت استفاده از آن به پایان رسیده. لطفاً کلید را بررسی کنید یا یک کلید جدید دریافت کنید."
        );
      } else {
        setError("خطا: Failed to fetch photos.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchPhotos(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetchPhotos("");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-800 text-white text-2xl font-bold p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-4">
      <Header
        searchHandle={handleSearch}
        inputRefrence={inputRef}
        searchQuery={query}
        clearSearchHandl={clearSearch}
        setQuery={setQuery}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="masonry-grid">
          {photos.map((photo) => (
            <ImageCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
