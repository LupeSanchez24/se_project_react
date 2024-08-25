import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, closeActiveModal, onAddItem, isOpen }) => {
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name {""}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        ></input>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image {""}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
        ></input>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className=" modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className=" modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className=" modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
