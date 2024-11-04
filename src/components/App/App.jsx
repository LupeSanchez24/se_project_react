import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { getItems, addNewItem, deleteItem } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProjectedRoute/ProtectedRoute.jsx";
import {
  checkToken,
  signIn,
  signUp,
  updateCurrentUser,
  addCardLike,
  removeCardLike,
} from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //console.log(currentTemperatureUnit);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleDeleteClick = () => {
    setActiveModal("delete-modal");
  };
  const handleSignUpClick = () => {
    setActiveModal("signup-modal");
  };

  const handleLogInClick = () => {
    setActiveModal("login-modal");
  };

  const handleProfileChangeClick = () => {
    setActiveModal("user-modal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values, resetForm) => {
    // console.log(values);
    const token = localStorage.getItem("jwt");
    addNewItem(values, token)
      .then((data) => {
        console.log("Received data from API:", data);
        setClothingItems((prevItems) => [data.data, ...prevItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard, token)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== selectedCard._id
        );
        setClothingItems(newClothingItems);
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleRegistration = ({ name, email, password, avatar }) => {
    const userProfile = { name, email, password, avatar };
    signUp(userProfile).then((res) => {
      handleLogin({ email, password });
    });
  };

  const handleLogin = ({ email, password }) => {
    console.log("Attempting to login");
    setIsLoading(true);

    signIn({ email, password })
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        } else {
          console.error("No token in response");
          throw new Error("No token in response");
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setCurrentUser(data);
        closeActiveModal();
        setLoggedIn(true);

        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateCurrentUser({ name, avatar }, token)
      .then((data) => {
        setCurrentUser(data.user);
        closeActiveModal();
        navigate("/profile");
        setIsAuthenticated(true);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error during update profile:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Token validation failed", error);
          localStorage.removeItem("jwt");
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser} LoggedIn={LoggedIn}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
              weatherData={weatherData}
              // currentTemperatureUnit={currentTemperatureUnit}
              handleToggleSwitchChange={handleToggleSwitchChange}
              currentUser={currentUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  //pass clothingItems as a prop
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute LoggedIn={LoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      element={Profile}
                      currentUser={currentUser}
                      handleProfileChangeClick={handleProfileChangeClick}
                      handleCardLike={handleCardLike}
                      handleSignout={handleSignout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <ModalWithForm />
          {activeModal === "add-garment" && (
            <AddItemModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {activeModal === "delete-modal" && (
            <DeleteModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              handleDeleteItem={handleDeleteItem}
              selectedCard={selectedCard}
            />
          )}
          {activeModal === "signup-modal" && (
            <RegisterModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "signup-modal"}
              handleRegistration={handleRegistration}
              handleLogInClick={handleLogInClick}
            />
          )}
          {activeModal === "login-modal" && (
            <LoginModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "login-modal"}
              handleLogin={handleLogin}
              handleSignUpClick={handleSignUpClick}
            />
          )}
          {activeModal === "user-modal" && (
            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "user-modal"}
              handleUpdateProfile={handleUpdateProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
