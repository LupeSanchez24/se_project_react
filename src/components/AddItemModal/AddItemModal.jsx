import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      imageUrl: "",
      weather: "",
    };

    if (!name) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!imageUrl) {
      errors.imageUrl = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(imageUrl)) {
      errors.imageUrl = "Invalid URL format.";
      isValid = false;
    }

    if (!weather) {
      errors.weather = "Weather type is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setName("");
    setUrl("");
    setWeather("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddItem({ name, imageUrl, weather, resetForm });
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
        {errors.name && <span className="modal__error ">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        ></input>
        {errors.imageUrl && (
          <span className="modal__error  ">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error modal__error_weather">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
