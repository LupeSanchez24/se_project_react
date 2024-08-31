import "./DeleteModal.css";
import close from "../../assets/close.svg";

function DeleteModal({ activeModal, handleCloseClick, handleDeleteItem }) {
  return (
    <div
      className={`modal ${activeModal === "delete-modal" && "modal_opened"}`}
    >
      <div className="modal__container ">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close-button" />
        </button>

        <div className="modal_question">
          <h2 className="modal__question_delete">
            Are you sure you want to delete this item?
          </h2>
          <p className="modal__question_warning">
            This action is irreversible.
          </p>
          <button
            className="modal__question_confirm"
            onClick={handleDeleteItem}
          >
            Yes, delete them
          </button>
          <button onClick={handleCloseClick} className="modal__question_cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
