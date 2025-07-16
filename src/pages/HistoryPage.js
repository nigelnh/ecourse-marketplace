import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserBehavior } from "../contexts/UserBehaviorContext";
import { getCourses } from "../services/apiService";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductModal from "../components/ProductModal/ProductModal";
import SuggestionsButton from "../components/SuggestionsButton/SuggestionsButton";
import SuggestionsModal from "../components/SuggestionsModal/SuggestionsModal";
import { Loader } from "lucide-react";
import "../styles/pages/HistoryPage.css";

function HistoryPage() {
  const { viewedCourses, addViewedCourse } = useUserBehavior();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);
        setError(null);
      } catch (err) {
        setError("Không thể tải lịch sử xem khóa học.");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const historyCourses = viewedCourses
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean)
    .reverse();

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
    <div className="history-page">
      <h1>Lịch sử xem ({viewedCourses.length})</h1>

      {loading ? (
        <div className="loading-state">
          <Loader className="loading-spinner" />
          <p className="loading-text">Đang tải lịch sử xem...</p>
        </div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : historyCourses.length > 0 ? (
        <div className="courses-container">
          {historyCourses.map((course) => (
            <ProductCard
              key={course.id}
              course={course}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Chưa có lịch sử xem khóa học nào</p>
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

export default HistoryPage;
