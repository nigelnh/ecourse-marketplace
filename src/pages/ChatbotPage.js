import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { getCourses } from "../services/apiService";
import ProductModal from "../components/ProductModal/ProductModal";
import { useUserBehavior } from "../contexts/UserBehaviorContext";
import "../styles/pages/ChatbotPage.css";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là AI Assistant của eCourse Marketplace. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp. Bạn muốn học gì nào?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addViewedCourse } = useUserBehavior();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };
    loadCourses();
  }, []);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock AI logic to suggest courses based on keywords
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let response = "";
    let recommendedCourses = [];

    // Keywords mapping to course suggestions
    if (message.includes("react") || message.includes("frontend")) {
      recommendedCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes("react") ||
          course.title.toLowerCase().includes("frontend") ||
          course.title.toLowerCase().includes("javascript")
      );
      response =
        "Tuyệt vời! Tôi thấy bạn quan tâm đến React và Frontend development. Đây là những khóa học phù hợp nè:";
    } else if (
      message.includes("backend") ||
      message.includes("node") ||
      message.includes("api")
    ) {
      recommendedCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes("node") ||
          course.title.toLowerCase().includes("backend") ||
          course.title.toLowerCase().includes("api")
      );
      response =
        "Backend development là lựa chọn tuyệt vời! Tôi recommend những khóa học này nè:";
    } else if (
      message.includes("tiếng anh") ||
      message.includes("english") ||
      message.includes("người mỹ")
    ) {
      recommendedCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes("english") ||
          course.title.toLowerCase().includes("tiếng anh") ||
          course.author.toLowerCase().includes("native")
      );
      response =
        "Học tiếng Anh với người bản xứ là cách hiệu quả nhất! Những khóa học này có thể giúp bạn nè:";
    } else if (
      message.includes("python") ||
      message.includes("ai") ||
      message.includes("machine learning")
    ) {
      recommendedCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes("python") ||
          course.title.toLowerCase().includes("ai") ||
          course.title.toLowerCase().includes("machine")
      );
      response =
        "Python và AI đang rất hot! Tôi suggest những khóa học chất lượng này nè:";
    } else if (
      message.includes("design") ||
      message.includes("ui") ||
      message.includes("ux")
    ) {
      recommendedCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes("design") ||
          course.title.toLowerCase().includes("ui") ||
          course.title.toLowerCase().includes("ux")
      );
      response =
        "Design UI/UX là skill rất cần thiết! Những khóa học này sẽ giúp bạn nè:";
    } else if (
      message.includes("giá rẻ") ||
      message.includes("miễn phí") ||
      message.includes("budget")
    ) {
      recommendedCourses = courses
        .filter((course) => course.price < 500000)
        .slice(0, 3);
      response =
        "Tôi hiểu bạn muốn tìm khóa học với giá cả hợp lý. Đây là những lựa chọn tốt nè:";
    } else if (
      message.includes("nâng cao") ||
      message.includes("advanced") ||
      message.includes("chuyên sâu")
    ) {
      recommendedCourses = courses.filter(
        (course) =>
          course.level === "Advanced" ||
          course.title.toLowerCase().includes("nâng cao") ||
          course.title.toLowerCase().includes("advanced")
      );
      response =
        "Bạn muốn nâng cao kỹ năng? Tuyệt vời! Những khóa học này phù hợp nè:";
    } else {
      // Default response with random courses
      recommendedCourses = courses.sort(() => 0.5 - Math.random()).slice(0, 3);
      response =
        "Tôi hiểu bạn đang tìm kiếm khóa học phù hợp. Dựa trên dữ liệu của chúng tôi, tôi sẽ recommend:";
    }

    return { response, courses: recommendedCourses.slice(0, 3) };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);

      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse.response,
        sender: "bot",
        timestamp: new Date(),
        courses: aiResponse.courses,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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

  return (
    <div className="chatbot-page">
      {/* Header */}
      <div className="chatbot-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
        </Link>
        <div className="chatbot-title">
          <Bot size={24} />
          <h1>AI Tư vấn Khóa học</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === "bot" ? (
                  <Bot size={20} />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                {message.courses && message.courses.length > 0 && (
                  <div className="suggested-courses">
                    {message.courses.map((course) => (
                      <div key={course.id} className="mini-course-card">
                        <img src={course.image} alt={course.title} />
                        <div className="mini-course-info">
                          <h4>{course.title}</h4>
                          <p>{course.author}</p>
                          <span className="mini-course-price">
                            {course.price.toLocaleString("vi-VN")} VND
                          </span>
                          <button
                            className="mini-course-btn"
                            onClick={() => handleViewDetails(course)}
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tôi muốn học React..."
              className="chat-input"
              rows={1}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ChatbotPage;
