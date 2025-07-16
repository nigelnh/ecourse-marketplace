import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUserBehavior } from "../contexts/UserBehaviorContext";
import { getCourses } from "../services/apiService";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductModal from "../components/ProductModal/ProductModal";
import SuggestionsButton from "../components/SuggestionsButton/SuggestionsButton";
import SuggestionsModal from "../components/SuggestionsModal/SuggestionsModal";
import { Loader } from "lucide-react";

import "../styles/pages/FavoritesPage.css";

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { addViewedCourse } = useUserBehavior();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load courses from API
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách khóa học yêu thích.");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const favoriteCourses = favorites
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    addViewedCourse(course.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleOpenSuggestions = () => {
    setIsSuggestionsModalOpen(true);
  };

  const handleCloseSuggestions = () => {
    setIsSuggestionsModalOpen(false);
  };

  return (
    <div className="favorites-page">
      <h1>Khóa học yêu thích ({favorites.length})</h1>

      {loading ? (
        <div className="loading-state">
          <Loader className="loading-spinner" />
          <p className="loading-text">Đang tải khóa học yêu thích...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : favoriteCourses.length > 0 ? (
        <div className="courses-container">
          {favoriteCourses.map((course) => (
            <ProductCard
              key={course.id}
              course={course}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Chưa có khóa học yêu thích được lưu</p>
          <Link to="/">Khám phá khóa học</Link>
        </div>
      )}

      <SuggestionsButton onClick={handleOpenSuggestions} />

      {/* Suggestions Modal */}
      {isSuggestionsModalOpen && (
        <SuggestionsModal
          isOpen={isSuggestionsModalOpen}
          onClose={handleCloseSuggestions}
          onViewDetails={handleViewDetails}
        />
      )}

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
