import "./ItemModal.css";
import close from "../../assets/white-close.svg";

function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  handleDeleteClick,
  currentUser,
  selectedCard,
}) {
  const isOwn = selectedCard.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close-button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteClick}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
