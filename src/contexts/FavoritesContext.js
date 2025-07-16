import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useToast } from "./ToastContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { showSuccess, showInfo } = useToast();
  const lastActionRef = useRef(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle toast notifications based on last action
  useEffect(() => {
    if (lastActionRef.current) {
      const { action } = lastActionRef.current;

      if (action === "add") {
        showSuccess("Khóa học đã được thêm vào yêu thích");
      } else if (action === "remove") {
        showInfo("Khóa học đã được xóa khỏi yêu thích");
      }

      // Clear the action after showing toast
      lastActionRef.current = null;
    }
  }, [favorites, showSuccess, showInfo]);

  const toggleFavorite = (courseId) => {
    setFavorites((prev) => {
      const isCurrentlyFavorite = prev.includes(courseId);

      if (isCurrentlyFavorite) {
        // Removing from favorites
        lastActionRef.current = { action: "remove", courseId };
        return prev.filter((id) => id !== courseId);
      } else {
        // Adding to favorites
        lastActionRef.current = { action: "add", courseId };
        return [...prev, courseId];
      }
    });
  };

  const isFavorite = (courseId) => {
    return favorites.includes(courseId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
