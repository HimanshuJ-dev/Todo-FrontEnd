import { useState } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { createUserFetch } from "../../sagas/actions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if (name.length < 1) {
          setNameError("Please enter a name");
      } else if (!email.includes("@")) {
          setEmailError("Invalid Email");
      } else if (password.length < 6) {
          setPasswordError("Password should be at least 6 characters long.");
      } else if (confirmPassword !== password) {
          setConfirmPasswordError("Passwords do not match");
      } else {
          dispatch(createUserFetch(name, email, password));
          navigate("/tasks");
      }
  };

  const handleInputChange = (e) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    // Clear the email and password errors.
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  return (
    <div className="signUpContainer">
      <div className="signupQuotesContainer">
        <p>A Powerful and Flexible Tool to Manage Your Workload</p>
        <p>A Fun and Interactive Platform to Achieve Your Goals</p>
        <p>A Fast and Reliable App to Boost Your Productivity</p>
        <p>A Beautiful and Intuitive App to Plan Your Day</p>
        <p>A Smart and Simple Way to Organize Your Life</p>
        <p>A Complete and Easy Solution for Your To-Do List</p>
      </div>
      <div className="signUpFormContainer">
        <div className="signUpCard">
          <div>
            <h1>Register now to get started!</h1>
          </div>
          {nameError && <p className="inputError">{nameError}</p>}
          {emailError && <p className="inputError">{emailError}</p>}
          {passwordError && <p className="inputError">{passwordError}</p>}
          {confirmPasswordError && (
            <p className="inputError">{confirmPasswordError}</p>
          )}
          <form className="signUpForm" onSubmit={handleSubmit}>
            <input
              className="inputBox"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              className="inputBox"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />

            <input
              className="inputBox"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              className="inputBox"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
