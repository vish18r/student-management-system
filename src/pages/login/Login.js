import { useState } from "react"; //Used to store and update data inside a component
import { useNavigate } from "react-router-dom";
import axios from "axios";  //axios is a library to call backend APIs

export default function Login() {

  //STATE VARIABLES
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  //form → stores form data
  //setForm → updates form data
  const [error, setError] = useState(""); //Stores error message Initially empty
//It is a FUNCTION, but stored inside a variable.
  const handleChange = (e) => //Event object (input change event)
    setForm({ ...form, [e.target.name]: e.target.value });
    //...spread operator Keeps old values
//Input name (email or password)  e.target.value What user types
  const login = async () => {
    //async → because API call takes time
    setError("");
//Clears old error before new login attemp
    const { email, password } = form;  //Take email and password out of form object
    if (!email || !password) // If any one condition is true, result is true
      return setError("Email and Password are required");

    try {
      //API CALL
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        form
      );
//Saves token Used for authentication Sent in headers later
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem(
        "username",
        data.firstName?.trim() || "User"
      );

      alert("Login successful ✅");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Server error."
      );
    }
  };

  const inputStyle =
    "w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className={inputStyle}
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
