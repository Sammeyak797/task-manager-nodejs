import {
  fetchTasks,
  createTask,
  toggleTask,
  removeTask,
  getTaskStats,
  getOverdueTasks,
} from "../services/tasks.service.js";

export async function getTasks(req, res) {
  try {
    const tasks = await fetchTasks(req.query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function postTasks(req, res) {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function patchTasks(req, res) {
  try {
    const task = await toggleTask(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTasks(req, res) {
  try {
    await removeTask(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getStats(req, res) {
  try {
    const stats = await getTaskStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOverdueTask(req, res) {
  try {
    const tasks = await getOverdueTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
