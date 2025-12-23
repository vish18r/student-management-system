import { useNavigate } from "react-router-dom";

export default function Header() {  //This creates a React functional component
  const navigate = useNavigate();

  const go = (path) => navigate(path);

  const logout = () => {
    ["token", "email", "username"].forEach((k) =>
      localStorage.removeItem(k) //Browser memory Stores data even after refresh
    );
    go("/login"); //After logout → go to login page
  };

  const navBtn =
    "px-3 py-1 rounded hover:bg-blue-700 transition";

  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => go("/dashboard")}
      >
        Student Details
      </h2>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        {[
          //Menu buttons (IMPORTANT) Array of menu itemsEach item has:

//label → button text

//path → route
          { label: "Dashboard", path: "/dashboard" },
          { label: "Add Student", path: "/students/add" },
          { label: "View Students", path: "/students/list" },
        ].map(({ label, path }) => (
          <button
            key={label} //Required by React
            onClick={() => go(path)} //Navigate to route
            className={navBtn}
          >
            {label}
          </button>
        ))}

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
