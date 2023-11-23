import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersFetch } from '../../sagas/userReducer/userReducerActions';
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setEmailError("Invalid Email");
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
    } else {
        dispatch(getUsersFetch(email, password));
        navigate("/tasks");
    }
  };

  const handleInputChange = (e) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // Clear the email and password errors.
    setEmailError("");
    setPasswordError("");
    setLoginError("");
  };

  return (
    <div className="loginContainer">
      <div className="loginQuotesContainer">
        <p>A Powerful and Flexible Tool to Manage Your Workload</p>
        <p>A Fun and Interactive Platform to Achieve Your Goals</p>
        <p>A Fast and Reliable App to Boost Your Productivity</p>
        <p>A Beautiful and Intuitive App to Plan Your Day</p>
        <p>A Smart and Simple Way to Organize Your Life</p>
        <p>A Complete and Easy Solution for Your To-Do List</p>
      </div>
      <div className="loginFormContainer">
        <div className="loginCard">
          <div>
            <h1>Sign in to continue</h1>
          </div>
          {emailError && <p className="inputError">{emailError}</p>}
          {passwordError && <p className="inputError">{passwordError}</p>}
          {loginError && <p className="inputError">{loginError}</p>}
          <form className="loginForm" onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
