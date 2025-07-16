import React from "react";
import { Lightbulb } from "lucide-react";
import "../../styles/components/SuggestionsButton.css";

const SuggestionsButton = ({ onClick }) => {
  return (
    <button className="suggestions-button" onClick={onClick}>
      <Lightbulb size={24} />
    </button>
  );
};

export default SuggestionsButton;
