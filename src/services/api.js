import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },// this one is backend url
});

export const addStudent = (data) => api.post("/students", data);
//Sends POST request used to add a student
export const getStudents = () => api.get("/students");
//Fetch all students Uses GET request
export const getStudentById = (id) => api.get(`/students/${id}`);// Fetch single student
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
//Updates existing student Uses PUT request
export const deleteStudent = (id) => api.delete(`/students/${id}`);
//Deletes student by ID Uses DELETE request
export default api;
//Can be reused anywhere