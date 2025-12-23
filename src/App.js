import { Routes, Route, Navigate, useLocation } from "react-router-dom";

//Routes	Container that holds all routes
//Route	Defines one path → one page
//Navigate	Redirect user automatically
//useLocation	Gives current URL info
import Header from "./pages/header/Header";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import StudentForm from "./pages/students/StudentForm";
import StudentList from "./pages/students/StudentList";
import UpdateStudent from "./pages/students/UpdateStudent";
//Without App, React app will not run
export default function App() {
  const { pathname } = useLocation();
  const hideHeader = ["/login", "/signup"].includes(pathname);//pages where header should be hidden
                                        //
                                        //checks current page
                                         // //React Fragment<>
  return (
    <>
   
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students/add" element={<StudentForm />} />
        <Route path="/students/list" element={<StudentList />} />
        <Route path="/students/update/:id" element={<UpdateStudent />} />
        
      </Routes>
    </>
    //:id is a placeholder for a real value
    //:id is a route parameter used to capture dynamic values from the URL.
  );
}
//  {!hideHeader && <Header />}Conditional Header rendering

//&&condition && component