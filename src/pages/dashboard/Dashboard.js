import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-[420px] text-center">
        <h1 className="text-2xl font-bold mb-6">
          Welcome {username} !!!
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/students/add")}
            className="bg-blue-600 text-white py-2 rounded-md
                       hover:bg-blue-700 transition"
          >
            Add Student
          </button>

          <button
            onClick={() => navigate("/students/list")}
            className="bg-green-600 text-white py-2 rounded-md
                       hover:bg-green-700 transition"
          >
            View Students
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white py-2 rounded-md
                       hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
