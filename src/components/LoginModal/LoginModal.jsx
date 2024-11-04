import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../LoginModal/LoginModal.css";

const LoginModal = ({
  closeActiveModal,

  isOpen,
  handleLogin,
  handleSignUpClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  const resetForm = () => {
    setEmail("");

    setPassword("");
    setErrors({ email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ email, password });
    resetForm();
    validateForm();
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailchange = (e) => setEmail(e.target.value);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label ">
        Email *
        <input
          type="email"
          className={`modal__input modal__input_login ${
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
          className={`modal__input modal__input_login ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        {errors.password && (
          <span className="modal__error ">{errors.password}</span>
        )}
      </label>

      <button
        onClick={handleSignUpClick}
        className=" modal__submit modal__submit_signup"
      >
        {" "}
        Or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
