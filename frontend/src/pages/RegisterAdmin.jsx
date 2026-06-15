import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerAdmin } from "../services/authService";

function RegisterAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerAdmin({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      alert("Admin registered successfully");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Register Admin</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
          </label>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">
            Password:
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            Email:
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default RegisterAdmin;