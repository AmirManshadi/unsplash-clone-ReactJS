// src/components/PhotoDetail.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// تعریف یک تایپ برای اطلاعات عکاس
interface User {
  name: string;
  links: {
    html: string;
  };
}

// تعریف یک تایپ برای عکس به همراه جزئیات بیشتر
interface PhotoDetail {
  id: string;
  urls: {
    full: string;
  };
  alt_description: string;
  user: User;
}

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>(); // دریافت id از URL
  const [photo, setPhoto] = useState<PhotoDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // اینجا کلید دسترسی Unsplash رو قرار بده.
  const ACCESS_KEY = "QAPMxAtowrVaXDmFa0yYR5yjOM3FerdlHj5tYdgJIuU";

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) {
        setError("Photo ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
        );
        setPhoto(response.data);
      } catch (err) {
        setError("Failed to fetch photo details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white text-2xl font-bold">
        درحال بارگذاری...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-800 text-white text-2xl font-bold p-4 text-center">
        خطا: {error}
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          برگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white text-2xl font-bold p-4 text-center">
        عکسی یافت نشد.
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          برگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-white p-4">
      <Link to="/" className="inline-block mb-6 text-black hover:underline">
        &larr; برگشت به صفحه اصلی
      </Link>
      <div className="max-w-4xl mx-auto bg-amber-300 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <img
            src={photo.urls.full}
            alt={photo.alt_description || "Unsplash photo"}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl text-black font-bold mb-2">
              {photo.alt_description || "Unsplash Photo"}
            </h1>
            <p className="text-black">
              توسط:
              <span className="font-semibold ml-1">{photo.user.name}</span>
            </p>
          </div>
          <div className="mt-4">
            <a
              href={photo.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-100 text-black p-3 rounded-lg font-semibold block text-center hover:bg-cyan-700 transition-colors"
            >
              مشاهده پروفایل عکاس
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
