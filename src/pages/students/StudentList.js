import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      load();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            List Students
          </h2>

          <button
            onClick={() => navigate("/students/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md
                       hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Department</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {s.name}
                    </td>
                    <td className="border px-4 py-2">
                      {s.email}
                    </td>
                    <td className="border px-4 py-2">
                      {s.department}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/students/update/${s.id}`)
                          }
                          className="bg-yellow-500 text-white px-3 py-1
                                     rounded hover:bg-yellow-600 transition"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(s.id)}
                          className="bg-red-600 text-white px-3 py-1
                                     rounded hover:bg-red-700 transition"
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
