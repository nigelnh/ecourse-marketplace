import { getCourses, getSuggestionsForUser } from "../services/apiService";

export const generateSuggestions = async (
  viewedCourses,
  favoriteCourses,
  userId = "user1"
) => {
  try {
    // Try to get suggestions from API first
    const apiSuggestions = await getSuggestionsForUser(userId);
    if (apiSuggestions && apiSuggestions.length > 0) {
      return apiSuggestions;
    }

    // Fallback to algorithm-based suggestions if no API suggestions
    const allCourses = await getCourses();
    return generateAlgorithmicSuggestions(
      allCourses,
      viewedCourses,
      favoriteCourses
    );
  } catch (error) {
    console.error("Error getting suggestions:", error);
    // Fallback to basic suggestions
    try {
      const allCourses = await getCourses();
      return generateAlgorithmicSuggestions(
        allCourses,
        viewedCourses,
        favoriteCourses
      );
    } catch (fallbackError) {
      console.error("Error in fallback suggestions:", fallbackError);
      return [];
    }
  }
};

const generateAlgorithmicSuggestions = (
  allCourses,
  viewedCourses,
  favoriteCourses
) => {
  // 1. Exclude courses user đã xem hoặc đã favorite
  const excludedIds = [...new Set([...viewedCourses, ...favoriteCourses])];
  const availableCourses = allCourses.filter(
    (course) => !excludedIds.includes(course.id)
  );

  // 2. Nếu chưa có behavior data, return random courses
  if (viewedCourses.length === 0 && favoriteCourses.length === 0) {
    return getRandomCourses(availableCourses, 3);
  }

  // 3. Analyze user preferences từ viewed + favorites
  const userCourses = allCourses.filter(
    (course) =>
      viewedCourses.includes(course.id) || favoriteCourses.includes(course.id)
  );

  // 4. Calculate suggestions score
  const scoredCourses = availableCourses.map((course) => ({
    ...course,
    score: calculateSuggestionScore(course, userCourses),
  }));

  // 5. Sort by score và return top suggestions
  return scoredCourses
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ score, ...course }) => course);
};

const calculateSuggestionScore = (course, userCourses) => {
  let score = 0;

  userCourses.forEach((userCourse) => {
    // Same level = +3 points
    if (course.level === userCourse.level) score += 3;

    // Same author = +2 points
    if (course.author === userCourse.author) score += 2;

    // Similar price range = +1 point
    if (isSimilarPrice(course.price, userCourse.price)) score += 1;

    // High rating = +1 point
    if (course.rating >= 4.5) score += 1;
  });

  return score;
};

const isSimilarPrice = (price1, price2) => {
  const difference = Math.abs(price1 - price2);
  return difference <= 300000; // Within 300k
};

const getRandomCourses = (courses, count) => {
  const shuffled = [...courses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
