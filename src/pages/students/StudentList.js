import { useEffect, useState } from "react";
//useState:  Used to store data inside a component When data changes → UI updates automatically
//useEffect: Used to run side effects Example: API call Fetch data
import { getStudents, deleteStudent } from "../../services/api";
//getStudents() → GET request → fetch all students
//deleteStudent(id) → DELETE request → delete student by id
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]); //initial value (empty list)
  const navigate = useNavigate();

  const load = async () => { //Load Students Function  Because API calls take time
    const { data } = await getStudents();
    //{ data } → destructuring  
    setStudents(data);
    //UI updates automatically
  };

  useEffect(() => {
    load();
  }, []);
  //useeff  Fetch data on page load

  const remove = async (id) => {
    //Delete Student Function
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    await deleteStudent(id);
    //Calls backend DELETE API
    load();
    //Refresh list
  };
//CSS Helper Variables
  const th = "border px-4 py-2 text-left";
  const td = "border px-4 py-2";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">List Students</h2>
          <button
            onClick={() => navigate("/students/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Email", "Department", "Actions"].map(h => (
                  <th key={h} className={`${th} ${h === "Actions" && "text-center"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map(({ id, name, email, department }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className={td}>{name}</td>
                    <td className={td}>{email}</td>
                    <td className={td}>{department}</td>
                    <td className={`${td} text-center`}>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/students/update/${id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => remove(id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
