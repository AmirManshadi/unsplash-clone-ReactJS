import { Link } from "react-router-dom";

interface ImageCardProps {
  photo: {
    id: string;
    urls: {
      regular: string;
    };
    alt_description: string;
  };
}

const ImageCard = ({ photo }: ImageCardProps) => {
  return (
    <div className="masonry-item">
      <Link to={`/photos/${photo.id}`}>
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || "Unsplash photo"}
            className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
