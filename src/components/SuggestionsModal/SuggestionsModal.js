import React, { useState, useEffect, useCallback } from "react";
import { X, Loader } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { generateSuggestions } from "../../utils/suggestionsService";
import { useUserBehavior } from "../../contexts/UserBehaviorContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { getSuggestionsForUser } from "../../services/apiService";
import "../../styles/components/SuggestionsModal.css";

const SuggestionsModal = ({ isOpen, onClose, onViewDetails }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { viewedCourses } = useUserBehavior();
  const { favorites } = useFavorites();

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userId = "user123";
      const apiSuggestions = await getSuggestionsForUser(userId);

      if (apiSuggestions.length > 0) {
        setSuggestions(apiSuggestions);
      } else {
        console.log("No API suggestions, using dynamic logic");
        const dynamicSuggestions = generateSuggestions(
          viewedCourses,
          favorites
        );
        setSuggestions(dynamicSuggestions);
      }
    } catch (error) {
      console.error("API error, using fallback logic:", error);
      const fallbackSuggestions = generateSuggestions(viewedCourses, favorites);
      setSuggestions(fallbackSuggestions);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen, fetchSuggestions]);

  if (!isOpen) return null;

  return (
    <div className="suggestions-modal-overlay" onClick={onClose}>
      <div className="suggestions-modal" onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className="suggestions-modal-header">
          <h2>Gợi ý Khoá học</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="suggestions-modal-content">
          {isLoading ? (
            <div className="loading-state">
              <Loader size={48} className="spinner" />
              <p>Đang tìm kiếm gợi ý cho bạn...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="suggestions-grid">
              {suggestions.map((course) => (
                <ProductCard
                  key={course.id}
                  course={course}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="empty-suggestions">
              <p>
                Chưa có gợi ý phù hợp. Hãy xem thêm các khóa học để nhận gợi ý
                tốt hơn!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsModal;
