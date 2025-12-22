import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addStudent = (data) => {
  return api.post("/students", data);
};

export const getStudents = () => {
  return api.get("/students");
};

export const getStudentById = (id) => {
  return api.get(`/students/${id}`);
};

export const updateStudent = (id, data) => {
  return api.put(`/students/${id}`, data);
};

export const deleteStudent = (id) => {
  return api.delete(`/students/${id}`);
};

export default api;
