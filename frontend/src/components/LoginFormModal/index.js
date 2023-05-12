// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = e => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: 'hothandzz', password: 'password'})).then(closeModal)
  }

  // const validCredentials = credential.length >= 4 && password.length >= 6 ? "modal-buttons-valid" : "modal-buttons"

  const loginStyle = credential.length >= 4 && password.length >= 6 ? {backgroundColor: "red", color: "white"} : {backgroundColor: "white"}

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
      {errors.credential && (
          <p id="wrong-password">{errors.credential}</p>
        )}
        <label>
          <input
            className="modal-bars"
            placeholder="     Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="modal-bars"
            placeholder="             Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* {errors.credential && (
          <p>{errors.credential}</p>
        )} */}
        <button className="modal-buttons" type="submit" style={loginStyle}>Log In</button>
        <button className="modal-buttons" onClick={demoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
