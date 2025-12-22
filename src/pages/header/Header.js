import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Student Details
      </h2>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/students/add")}
          className="px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Add Student
        </button>

        <button
          onClick={() => navigate("/students/list")}
          className="px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          View Students
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
