import Header from "./pages/header/Header";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import StudentForm from "./pages/students/StudentForm";
import StudentList from "./pages/students/StudentList";
import UpdateStudent from "./pages/students/UpdateStudent";

function App() {
  const location = useLocation();

  // Header hide on login & signup
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup";

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
  );
}

export default App;
