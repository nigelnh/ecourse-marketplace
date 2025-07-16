import React, { createContext, useContext, useState } from "react";
import { generateSuggestions } from "../utils/suggestionsService";
import { useUserBehavior } from "./UserBehaviorContext";
import { useFavorites } from "./FavoritesContext";

const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { viewedCourses } = useUserBehavior();
  const { favorites } = useFavorites();

  const getSuggestions = async (userId = "user1") => {
    try {
      setLoading(true);
      setError(null);

      const suggestedCourses = await generateSuggestions(
        viewedCourses,
        favorites,
        userId
      );

      setSuggestions(suggestedCourses);
      return suggestedCourses;
    } catch (err) {
      console.error("Error getting suggestions:", err);
      setError("Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.");
      setSuggestions([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setError(null);
  };

  const value = {
    suggestions,
    loading,
    error,
    getSuggestions,
    clearSuggestions,
  };

  return (
    <SuggestionsContext.Provider value={value}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export const useSuggestions = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestions must be used within a SuggestionsProvider");
  }
  return context;
};
