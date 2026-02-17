import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
import Taskrouter from "./src/routes/tasks.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

// Routes
app.use("/api/tasks", Taskrouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
