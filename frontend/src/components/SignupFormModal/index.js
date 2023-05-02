// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  // error handling
  useEffect(() => {
    let errorArray = [];
    if (!email.includes("@")) errorArray.push('Please provide a valid email');
    if (username.length < 4) errorArray.push('Username must be at least 4 characters');
    if (password.length < 6) errorArray.push('Password must be at least 6 characters');
    if (password !== confirmPassword) errorArray.push('Confirm Password field must be the same as the Password field');
    setErrors(errorArray);
  }, [password, confirmPassword, username, email])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (errors.length === 0) {
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          {hasSubmitted && errors.length > 0 &&errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
        </div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit"
        className="activated"
        >Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
