import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useUserBehavior } from "../../contexts/UserBehaviorContext";
import { Heart, Clock } from "lucide-react";
import "../../styles/components/Navigation.css";

function Navigation() {
  const { favorites } = useFavorites();
  const { viewedCourses } = useUserBehavior();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Left: Logo */}
          <div className="header-left">
            <h1 className="logo">XN</h1>
          </div>

          {/* Center: Page Title */}
          <div className="header-center">
            <Link to="/" className="page-title-link">
              <h2 className="page-title">eCourse Marketplace</h2>
            </Link>
          </div>

          {/* Right: User Actions */}
          <div className="header-right">
            <div className="user-section">
              <Link to="/history" className="history-link">
                <Clock size={20} />
                {viewedCourses.length > 0 && (
                  <span className="badge">{viewedCourses.length}</span>
                )}
              </Link>
              <Link to="/favorites" className="favorites-link">
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="badge">{favorites.length}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
