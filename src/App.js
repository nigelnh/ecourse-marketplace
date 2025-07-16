import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { SuggestionsProvider } from "./contexts/SuggestionsContext";
import { UserBehaviorProvider } from "./contexts/UserBehaviorContext";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import ChatbotPage from "./pages/ChatbotPage";
import Navigation from "./components/Navigation/Navigation";
import ToastContainer from "./components/Toast/Toast";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import "./styles/globals.css";

const AppContent = () => {
  const location = useLocation();
  const showChatbotButton = location.pathname !== "/chatbot";

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
      <ToastContainer />
      {showChatbotButton && <ChatbotButton />}
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <UserBehaviorProvider>
        <FavoritesProvider>
          <SuggestionsProvider>
            <Router>
              <AppContent />
            </Router>
          </SuggestionsProvider>
        </FavoritesProvider>
      </UserBehaviorProvider>
    </ToastProvider>
  );
}

export default App;
