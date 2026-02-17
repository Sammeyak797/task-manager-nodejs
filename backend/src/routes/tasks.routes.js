import express from "express";
import {
  getTasks,
  postTasks,
  patchTasks,
  deleteTasks,
  getStats,
  getOverdueTask,
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/overdue", getOverdueTask);

router.get("/", getTasks);
router.post("/", postTasks);
router.patch("/:id", patchTasks);
router.delete("/:id", deleteTasks);

export default router;
