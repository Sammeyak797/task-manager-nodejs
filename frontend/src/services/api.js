import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export const getTasks = (params = {}) => API.get("/", { params });

export const createTask = (data) => API.post("/", data);

export const updateTask = (id) => API.patch(`/${id}`);

export const deleteTask = (id) => API.delete(`/${id}`);
