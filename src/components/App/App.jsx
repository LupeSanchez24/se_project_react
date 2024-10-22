import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values, resetForm) => {
    // console.log(values);
    addNewItem(values)
      .then((data) => {
        console.log("Received data from API:", data); // Logs the response data
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard)
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
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  LoggedIn={LoggedIn}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                  element={Profile}
                />
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
          />
        )}
        {activeModal === "login-modal" && (
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login-modal"}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
