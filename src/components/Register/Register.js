import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the specific field error when the user starts typing in it
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7025/api/Auth/register",
        formData
      );

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration failed", error);

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error during registration request setup", error.message);
      }
    }
  };

  return (
    <div className="register">
      <div className="title">Registration</div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="form_input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form_input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form_input">
            <button type="submit" className="signup">
              Sign up
            </button>
          </div>

          <div className="form_input">
            <p>
              Have an account ?{" "}
              <Link className="reg_login" to={"/signin"}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
