import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.mobile.trim() ||
      !form.password.trim()
    ) {
      setError("Please fill all mandatory fields (*)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/signup", form);
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/login");
    } catch (err) {
      setError("Email or Phone number already exists, please login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[480px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up
        </h2>

        {/* First + Middle Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name *
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Middle Name
            </label>
            <input
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Last Name */}
        <label className="block text-sm font-medium mb-1">
          Last Name *
        </label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">
          Email *
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Mobile */}
        <label className="block text-sm font-medium mb-1">
          Mobile Number *
        </label>
        <div className="flex mb-4">
          <div className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100">
            🇮🇳 +91
          </div>
          <input
            name="mobile"
            maxLength="10"
            placeholder="Enter 10 digit number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-r-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <label className="block text-sm font-medium mb-1">
          Password *
        </label>
        <input
          type="password"
          name="password"
          placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition"
        >
          Next
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
