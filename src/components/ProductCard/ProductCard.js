import React from "react";
import { Heart, Star } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import "../../styles/components/ProductCard.css";

const ProductCard = ({ course, onViewDetails }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  // Handle favorite click
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(course.id);
  };

  // Format price helper function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Truncate text helper function
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={course.image} alt={course.title} />
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
        >
          <Heart
            size={20}
            className={isFavorite(course.id) ? "heart-filled" : "heart-outline"}
            fill={isFavorite(course.id) ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="product-content">
        <h3 className="product-title">{course.title}</h3>
        <p className="product-author">{course.author}</p>

        {/* Short Description with truncation */}
        {course.shortDescription && (
          <p className="product-description">
            {truncateText(course.shortDescription, 120)}
          </p>
        )}

        <div className="product-meta">
          <span className="product-rating">
            <Star size={16} fill="currentColor" className="star-icon" />
            {course.rating}
          </span>
          <span className="product-students">{course.students} học viên</span>
        </div>

        <div className="product-footer">
          <span className="product-price">{formatPrice(course.price)}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onViewDetails(course)}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
