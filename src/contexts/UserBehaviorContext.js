import { createContext, useState, useEffect, useContext } from "react";

const UserBehaviorContext = createContext();

export const useUserBehavior = () => {
  const context = useContext(UserBehaviorContext);

  if (!context) {
    throw new Error("useUserBehavior must be used within UserBehaviorProvider");
  }
  return context;
};

export const UserBehaviorProvider = ({ children }) => {
  // Stage management for viewed courses
  const [viewedCourses, setViewedCourses] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedViewedCourses = localStorage.getItem("viewedCourses");
    if (savedViewedCourses) {
      setViewedCourses(JSON.parse(savedViewedCourses));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("viewedCourses", JSON.stringify(viewedCourses));
  }, [viewedCourses]);

  const addViewedCourse = (courseId) => {
    // Add viewed courses into list (no duplicate)
    setViewedCourses((prev) => {
      if (!prev.includes(courseId)) {
        return [...prev, courseId];
      }
      return prev;
    });
  };

  const getViewedCourses = () => {
    return viewedCourses;
  };

  return (
    <UserBehaviorContext.Provider
      value={{
        viewedCourses,
        addViewedCourse,
        getViewedCourses,
      }}
    >
      {children}
    </UserBehaviorContext.Provider>
  );
};
