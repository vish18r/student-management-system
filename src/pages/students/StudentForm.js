import { useState } from "react"; //useState is a React Hook Used to store data in a component
import axios from "axios"; //axios is a library to send HTTP requests Used for GET, POST, PUT, DELETE
import { useNavigate } from "react-router-dom";

export default function StudentForm() { //COMPONENT START

  // default mean allows other files to import it
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    //student:	Current data
//setStudent:	Function to update data
//useState({...}):	Initial values
    name: "", email: "", department: "", phone: ""
  });
  const [error, setError] = useState("");
// handaling All fields are required
  const handle = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });
// e.target.name :Input field name
//e.target.value : Value typed by user
// ...student Copies old values
  const saveStudent = async () => {
    //SAVE STUDENT FUNCTION
    //async? : Allows await Used for API calls
    setError(""); //Clears previous error

    if (!Object.values(student).every(v => v.trim())) //VALIDATION 1: EMPTY FIELDS
   // Part	Meaning
//Object.values(student)	Gets all values
//.every()	Checks all
//v.trim()	Removes spaces
      return setError("All fields are required");

    if (!/^\d{10}$/.test(student.phone))// number 
      return setError("Phone number must be 10 digits");

    try {
      await axios.post("http://localhost:8080/api/students", student); //API CALL
      navigate("/students/list");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to save student"); //ERROR HANDLING
    }
  };

  const input =  //CSS CLASS VARIABLE
    "w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Student</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {["name", "email", "department", "phone"].map((f) => (//INPUT FIELDS LOOP
          <input
            key={f}
            name={f}
            placeholder={
              f === "phone" ? "Phone (10 digits)" : f[0].toUpperCase() + f.slice(1)
            }
            onChange={handle}
            className={`${input} ${f === "phone" && "mb-6"}`}
          />
        ))}

        <button
          onClick={saveStudent}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
