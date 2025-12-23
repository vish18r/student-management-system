import { useState } from "react"; //Without useState, you cannot store form input values
import { useNavigate } from "react-router-dom";
import axios from "axios"; // lib  A library to call backend APIs

export default function Signup() {  //Component Declaration Other files can import this component
  const navigate = useNavigate(); //Changes page URL  navigate("/login");
  const [form, setForm] = useState({
    //Current form data
    //setForm 👉 Function to update form data

   // form → stores all input values
   //setForm → updates form values
    firstName: "", middleName: "", lastName: "",
    email: "", mobile: "", password: ""  //Initial form state
  });
  const [error, setError] = useState(""); //To store error message
  const [loading, setLoading] = useState(false);
  // setloding Used to change loading value
   //While API is calling: disable button
// A variable (state) loading
//true → API running

//false → API finished
  const handle = (e) =>

    //e = event
    //e.target.name Name of input field
    //e.target.value Value typed by user
    //...form (spread operator) Copies old values
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    //Stop bad data before API call  Saves backend load 
    const { firstName, lastName, email, mobile, password } = form;  //Instead of writing:  form.firstName

    if (![firstName, lastName, email, mobile, password].every(v => v.trim())) ///Mandatory Field Check
      return "Please fill all mandatory fields (*)";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))   // Regex (pattern check) validating the mail
      return "Please enter a valid email address";

    if (!/^\d{10}$/.test(mobile))// exactly 10 digits  validating moblie
      return "Mobile number must be exactly 10 digits";

    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) // pass valid
      return "Password must have 8+ chars, 1 uppercase, 1 lowercase, 1 number & 1 special character";

    return "";
  };

  const submit = async () => { //API call takes time   This function contains time-taking work

//Example:

//API call

//Database request
    const msg = validate();//Run validation
    if (msg) return setError(msg); //stop execution

    try {
      setLoading(true);
      //Used to change loading value
      //You never directly change loading like:❌ loading = true

      //loading	Meaning
//true	Please wait
//false	You can go
      await axios.post("http://localhost:8080/api/auth/signup", form);//Code waits properly
      //await : Wait until task completes
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (e) {
      setError(e.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[480px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input name="firstName" placeholder="First Name *" onChange={handle} className={input} />
          <input name="middleName" placeholder="Middle Name" onChange={handle} className={input} />
        </div>

        <input name="lastName" placeholder="Last Name *" onChange={handle} className={`${input} mb-4`} />
        <input name="email" type="email" placeholder="Email *" onChange={handle} className={`${input} mb-4`} />

        <div className="flex mb-4">
          <div className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-100">🇮🇳 +91</div>
          <input name="mobile" maxLength="10" placeholder="Mobile *" onChange={handle} className={`${input} rounded-l-none`} />
        </div>

        <input name="password" type="password" placeholder="Password *" onChange={handle} className={`${input} mb-4`} />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Next"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
