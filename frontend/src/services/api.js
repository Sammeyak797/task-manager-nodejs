import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export const getTasks = () => API.get("/");
export const createTask = (data) => API.post("/", data);
export const updateTask = (id, data) => API.patch(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);
