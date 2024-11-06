import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  closeActiveModal,

  isOpen,
  handleUpdateProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [data, setData] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    avatarUrl: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      avatarUrl: "",
    };

    if (!name) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!avatarUrl) {
      errors.avatarUrl = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(avatarUrl)) {
      errors.avatarUrl = "Invalid URL format.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setName("");

    setAvatarUrl("");

    setErrors({ name: "", avatarUrl: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleUpdateProfile({ name, avatar: avatarUrl });
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setAvatarUrl(e.target.value);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatarUrl(currentUser.avatar);
    }
  }, [currentUser]);

  useEffect(() => {
    setData({ name: "", avatar: "" });
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className={`modal__input modal__input_signup ${
            errors.name ? "modal__input_error" : ""
          }`}
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
        {errors.name && <span className="modal__error ">{errors.name}</span>}
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *
        <input
          type="url"
          className={`modal__input modal__input_signup ${
            errors.avatarUrl ? "modal__input_error" : ""
          }`}
          id="avatarUrl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleUrlChange}
        ></input>
        {errors.avatarUrl && (
          <span className="modal__error  ">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
