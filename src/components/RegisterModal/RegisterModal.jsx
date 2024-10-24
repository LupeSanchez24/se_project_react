import { useState } from "react";
import close from "../../assets/close.svg";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  closeActiveModal,
  onAddItem,
  isOpen,
  handleRegistration,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      email: "",
      password: "",
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

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setAvatarUrl("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration();
    if (validateForm()) {
      onAddItem({ name, email, avatarUrl, password }, resetForm);
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setAvatarUrl(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailchange = (e) => setEmail(e.target.value);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label ">
        Email *
        <input
          type="email"
          className={`modal__input modal__input_signup ${
            errors.email ? "modal__input_error" : ""
          }`}
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailchange}
        ></input>
        {errors.email && <span className="modal__error ">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label ">
        Password *
        <input
          type="password"
          className={`modal__input modal__input_signup ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        {errors.email && (
          <span className="modal__error ">{errors.password}</span>
        )}
      </label>

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
        Avatar URL *
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
      <button type="submit" className="modal__sumbit modal__submit_signup">
        {" "}
        Or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
