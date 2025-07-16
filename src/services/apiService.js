import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getSuggestionsForUser = async (userId) => {
  try {
    const suggestionsResponse = await apiClient.get(
      `/suggestions?userId=${userId}`
    );

    const userSuggestions = suggestionsResponse.data.find(
      (s) => s.userId === userId
    );

    if (
      !userSuggestions ||
      !userSuggestions.courseIds ||
      userSuggestions.courseIds.length === 0
    ) {
      console.log(`No suggestions found for user ${userId}.`);
      return [];
    }

    const allCourses = await getCourses();

    const suggestedCourses = userSuggestions.courseIds
      .map((id) => allCourses.find((course) => course.id === id))
      .filter(Boolean);

    return suggestedCourses;
  } catch (error) {
    console.error(`Error fetching suggestions for user ${userId}:`, error);
    throw error;
  }
};
