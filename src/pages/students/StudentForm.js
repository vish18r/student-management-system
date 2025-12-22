import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentForm() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const saveStudent = async () => {
    setError("");

    if (!student.name || !student.email || !student.department || !student.phone) {
      setError("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(student.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/students", student);
      navigate("/students/list");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Student
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Department */}
        <input
          placeholder="Department"
          value={student.department}
          onChange={(e) =>
            setStudent({ ...student, department: e.target.value })
          }
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Phone */}
        <input
          placeholder="Phone (10 digits)"
          value={student.phone}
          onChange={(e) =>
            setStudent({ ...student, phone: e.target.value })
          }
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Save Button */}
        <button
          onClick={saveStudent}
          className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
