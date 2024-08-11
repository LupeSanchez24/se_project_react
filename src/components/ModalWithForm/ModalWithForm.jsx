import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button type="button" className="modal__close">
          CLOSE
        </button>
        <form className="modal__form">
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
            <legend className="modal__legend">Select the weather type;</legend>
            <label
              htmlFor="hot"
              className=" modal__label modal__label_type_radio"
            >
              <input id="hot" type="radio" className="modal__radio-input" />
              hot
            </label>
            <label
              htmlFor="warm"
              className=" modal__label modal__label_type_radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />{" "}
              warm
            </label>
            <label
              htmlFor="cold"
              className=" modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />{" "}
              cold
            </label>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
