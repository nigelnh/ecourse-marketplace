import React from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/ChatbotButton.css";

const ChatbotButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chatbot");
  };

  return (
    <button className="chatbot-button" onClick={handleClick}>
      <MessageCircle size={24} />
      <span className="chatbot-tooltip">AI Tư vấn</span>
    </button>
  );
};

export default ChatbotButton;
