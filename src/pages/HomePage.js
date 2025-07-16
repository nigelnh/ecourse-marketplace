import { useState, useEffect } from "react";
import { getCourses } from "../services/apiService";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/SearchBar";
import PriceFilter from "../components/PriceFilter/PriceFilter";
import { useUserBehavior } from "../contexts/UserBehaviorContext";
import SuggestionsButton from "../components/SuggestionsButton/SuggestionsButton";
import SuggestionsModal from "../components/SuggestionsModal/SuggestionsModal";
import ProductModal from "../components/ProductModal/ProductModal";
import { Loader } from "lucide-react";

import "../styles/components/ProductCard.css";
import "../styles/pages/HomePage.css";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addViewedCourse } = useUserBehavior();
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách khóa học. Vui lòng thử lại.");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((course) => {
        switch (priceFilter) {
          case "under500k":
            return course.price < 500000;
          case "500k-1m":
            return course.price >= 500000 && course.price <= 1000000;
          case "over1m":
            return course.price > 1000000;
          default:
            return true;
        }
      });
    }
    setFilteredCourses(filtered);
  }, [searchTerm, priceFilter, courses]);
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  const handleFilterChange = (newFilter) => {
    setPriceFilter(newFilter);
  };
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
    <div className="App">
      <div className="header-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <PriceFilter
          priceFilter={priceFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      {/* Results section */}
      <div className="courses-container">
        {loading ? (
          <div className="loading-state">
            <Loader className="loading-spinner" />
            <p className="loading-text">Đang tải khóa học...</p>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <ProductCard
              key={course.id}
              course={course}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <p>Không tìm thấy khóa học nào phù hợp.</p>
        )}
      </div>
      <SuggestionsButton onClick={handleOpenSuggestions} />{" "}
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

export default HomePage;
