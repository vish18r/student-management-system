import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      // ✅ Save login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem(
        "username",
        res.data.firstName && res.data.firstName.trim()
          ? res.data.firstName
          : "User"
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
