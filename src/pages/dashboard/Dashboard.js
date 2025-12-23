import { useNavigate } from "react-router-dom"; //react-router-dom is a React library used to navigate between pages using URLs without reloading the page

export default function Dashboard() {  //functional component named Dashboard
  const navigate = useNavigate(); //navigate is a function Used to move to another route
  const username = localStorage.getItem("username") ?? "User"; //Browser storage Stores data even after page refresh

  const go = (path) => navigate(path); //path means “which page / route to go to”
//npm → Node Package Manager
//npx = Node Package Execute
  const logout = () => {//arrow function
    localStorage.clear(); //removes user data
    go("/login"); ///redirect to login page
  };

  const btn =
    "text-white py-2 rounded-md transition"; //Padding on Y-axis (Top & Bottom)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-[420px] text-center">
        <h1 className="text-2xl font-bold mb-6">
          Welcome {username} !!!
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => go("/students/add")} //Navigate to the page where we add a student
            className={`${btn} bg-blue-600 hover:bg-blue-700`}
          >
            Add Student
          </button>

          <button
            onClick={() => go("/students/list")}//“Navigate to the page that shows all student
            className={`${btn} bg-green-600 hover:bg-green-700`}
          >
            View Students
          </button>

          <button
            onClick={logout}
            className={`${btn} bg-red-600 hover:bg-red-700`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


//useNavigate:  useNavigate is a hook from React Router

// It is used to move (navigate) from one page to another

//??If the left value is null or undefined, use the right value.”

//?? only checks null or undefined
//👉 || checks all falsy values

//If the left condition is true, then do the right thing.”
////build is the final production-ready version of your app.

//.env stores secret or environment-specific values.

//npx is a tool to run packages without installing them globally