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

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

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
  const handleDeleteClick = (card) => {
    setActiveModal("delete-modal");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    console.log(values);
    addNewItem(values)
      .then((data) => {
        console.log("Received data from API:", data); // Logs the response data
        setClothingItems([data, ...clothingItems]);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
    closeActiveModal();
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard.id)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== selectedCard.id
        );
        setClothingItems(newClothingItems);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
    closeActiveModal();
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
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
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
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
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
