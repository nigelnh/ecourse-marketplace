// // Axios approach
//  import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 5000,
// });

// export const getCourses = async () => {
//   try {
//     const response = await apiClient.get("/courses");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw error;
//   }
// };

// export const getSuggestionsForUser = async (userId) => {
//   try {
//     const suggestionsResponse = await apiClient.get(
//       `/suggestions?userId=${userId}`
//     );

//     const userSuggestions = suggestionsResponse.data.find(
//       (s) => s.userId === userId
//     );

//     if (
//       !userSuggestions ||
//       !userSuggestions.courseIds ||
//       userSuggestions.courseIds.length === 0
//     ) {
//       console.log(`No suggestions found for user ${userId}.`);
//       return [];
//     }

//     const allCourses = await getCourses();

//     const suggestedCourses = userSuggestions.courseIds
//       .map((id) => allCourses.find((course) => course.id === id))
//       .filter(Boolean);

//     return suggestedCourses;
//   } catch (error) {
//     console.error(`Error fetching suggestions for user ${userId}:`, error);
//     throw error;
//   }
// };

// mockData approach
import { courses } from "../utils/mockData";

const simulateApiCall = async (endpoint, delay = 1000) => {
  console.log(`Mock API call to: ${endpoint}`);
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export const getCourses = async () => {
  try {
    // Simulate API call với delay
    await simulateApiCall("/courses", 800);

    const mockResponse = {
      data: courses,
      status: 200,
      statusText: "OK",
    };

    return mockResponse.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getSuggestionsForUser = async (userId) => {
  try {
    // Simulate API call to /suggestions?userId=xxx
    await simulateApiCall(`/suggestions?userId=${userId}`, 1200);

    const mockSuggestionsResponse = {
      data: [
        {
          userId: "user123",
          courseIds: [1, 3, 5, 9, 10, 6],
        },
      ],
      status: 200,
    };

    const userSuggestions = mockSuggestionsResponse.data.find(
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
