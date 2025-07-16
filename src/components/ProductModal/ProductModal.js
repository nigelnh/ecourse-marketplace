import { Heart, Star } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import "../../styles/components/ProductModal.css";

function ProductModal({ isOpen, course, onClose }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!isOpen || !course) return null;

  const handleFavoriteClick = () => {
    toggleFavorite(course.id);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars-container">
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <Star
            key={`full-${i}`}
            size={16}
            fill="#ffd700"
            stroke="#ffd700"
            className="star-icon filled"
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="half-star-container">
            <Star
              size={16}
              fill="#ffd700"
              stroke="#ffd700"
              className="star-icon half-filled"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
            <Star
              size={16}
              fill="none"
              stroke="#ddd"
              className="star-icon empty"
              style={{
                position: "absolute",
                left: 0,
                clipPath: "inset(0 0 0 50%)",
              }}
            />
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star
            key={`empty-${i}`}
            size={16}
            fill="none"
            stroke="#ddd"
            className="star-icon empty"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{course.title}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Image section */}
        <div className="modal-image">
          <img src={course.image} alt={course.title} className="course-image" />

          {/* Heart button positioned over image */}
          <button
            className={`modal-favorite-btn ${
              isFavorite(course.id) ? "active" : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label="Toggle favorite"
          >
            <Heart
              size={24}
              className={
                isFavorite(course.id) ? "heart-filled" : "heart-outline"
              }
              fill={isFavorite(course.id) ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Meta Info */}
        <div className="modal-meta">
          <div className="rating-section">
            {renderStars(course.rating)}
            <span className="rating-text">
              {course.rating} ({course.reviewCount.toLocaleString()} đánh giá)
            </span>
          </div>

          <div className="course-stats">
            <span className="stat">
              Số lượng: {course.students.toLocaleString()} học viên
            </span>
            <span className="stat">Thời gian: {course.duration}</span>
            <span className="stat">Độ khó: {course.level}</span>
            <span className="stat">Cập nhật: {course.lastUpdated}</span>
          </div>
        </div>

        {/* Course Info */}
        <div className="modal-body">
          <div className="course-instructor">
            <h4>Giảng viên: {course.author}</h4>
          </div>

          <div className="course-price">
            <h3 className="price">
              {course.price.toLocaleString("vi-VN")} VNĐ
            </h3>
          </div>

          <div className="course-description">
            <h4>📖 Mô tả chi tiết:</h4>
            <div className="description-content">
              {course.fullDescription.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="modal-buttons">
          <button className="btn-enroll">Đăng ký học</button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
