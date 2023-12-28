import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://localhost:7025/api/Auth/login",
        formData
      );

      const token = response.data;
      saveToLocalStorage("token", token);
      navigate("/home");
    } catch (error) {
      handleLoginError(error);
    }
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const handleLoginError = (error) => {
    console.error("Login failed", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      setError("Login failed: " + error.response.data);
    } else if (error.request) {
      console.error("No response received from the server");
      setError("Login failed: No response received from the server");
    } else {
      console.error("Error during login request setup", error.message);
      setError("Login failed: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="title">Login</div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form_input">
            <button type="submit" className="login_button">
              Log in
            </button>
          </div>

          {error && <div className="error_message">{error}</div>}

          <div className="form_input">
            <p>
              Do not have an account ?{" "}
              <Link className="login_reg" to={"/signup"}>
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
