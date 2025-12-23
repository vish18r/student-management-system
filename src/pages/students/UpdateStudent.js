// Import React Hooks
//Hooks let function components use state and lifecycle features
import { useEffect, useState } from "react";
// useState  -> store & update data
// useEffect -> run code automatically (side effects)

// Import routing hooks
import { useNavigate, useParams } from "react-router-dom";
// useParams()  -> get data from URL
// useNavigate() -> redirect user to another page

// Import API methods
import { getStudentById, updateStudent } from "../../services/api";

export default function UpdateStudent() {

  // Get "id" from URL (example: /students/update/5 → id = 5)
  const { id } = useParams();

  // Used to navigate programmatically
  const navigate = useNavigate();

  // State to store student details
  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    phone: ""
  });

  // State to store error messages
  const [error, setError] = useState("");

  // useEffect runs when component loads OR when id changes
  useEffect(() => {

    // IIFE (Immediately Invoked Function Expression)
    // Used because useEffect callback cannot be async directly
    (async () => {
      try {
        // Fetch student data by ID
        const { data } = await getStudentById(id);

        // Set fetched data into state (fills the form)
        setStudent({
          ...data,
          // Convert phone to string to avoid trim() error
          phone: data.phone?.toString() || ""
        });
      } catch {
        // If API fails
        setError("Failed to load student");
      }
    })();

  }, [id]); // Dependency array → runs when id changes

  // Handles input change for ALL fields
  const handle = (e) =>
    setStudent({
      ...student,                 // keep old values
      [e.target.name]: e.target.value // update only changed field
    });

  // Called when Update button is clicked
  const update = async () => {

    // Validation: check all fields are filled
    // Convert values to string before trim to avoid runtime error
    if (!Object.values(student).every(v => String(v).trim()))
      return setError("All fields are required");

    try {
      // Call API to update student
      await updateStudent(id, student);

      // Navigate back to student list after success
      navigate("/students/list");
    } catch (e) {
      // Show backend error or default message
      setError(e.response?.data?.message || "Update failed");
    }
  };

  // Common Tailwind input styles
  const input =
    "w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-[450px] bg-white p-8 rounded-xl shadow-md">

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Student
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Input Fields */}
        {["name", "email", "department", "phone"].map((f) => (
          <input
            key={f}                              // unique key
            name={f}                             // used in handle()
            placeholder={f[0].toUpperCase() + f.slice(1)}
            value={student[f]}                   // controlled input
            onChange={handle}                    // update state on typing
            className={`${input} ${f === "phone" && "mb-6"}`}
          />
        ))}

        {/* Update Button */}
        <button
          onClick={update}
          className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition"
        >
          Update
        </button>

      </div>
    </div>
  );
}
