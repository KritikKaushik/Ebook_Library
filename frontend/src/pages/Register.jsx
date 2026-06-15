import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  register,
  registerAuthor,
} from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
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
    const payload = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log("Submitting:", payload);

    let data;

    if (formData.role === "author") {
      data = await registerAuthor(payload);
    } else {
      data = await register(payload);
    }

    console.log("Response:", data);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    alert("Registration successful");
  } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response?.data);

  alert(
    JSON.stringify(error.response?.data) ||
    error.message
  );
}
};

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="reader">Reader</option>
            <option value="author">Author</option>
          </select>

          <button type="submit">
            Register
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Register;