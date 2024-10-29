import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  handleSignUpClick,
  handleLogInClick,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
      />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <button
        onClick={handleSignUpClick}
        type="button"
        className="header__signup-btn"
      >
        Signup
      </button>
      <button
        onClick={handleLogInClick}
        type="button"
        className="header__login-btn"
      >
        Log In
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">{currentUser?.name}</p>
          {currentUser?.avatar ? (
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser?.name?.chartAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
