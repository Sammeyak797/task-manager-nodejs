import Tasks from "../models/tasks.model.js";

export async function getTasks(req, res) {
  try {
    const tasks = await Tasks.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function postTasks(req, res) {
  try {
    const {
      title,
      description,
      priority = "medium",
      completed = false,
    } = req.body;

    const task = new Tasks({
      title,
      description,
      priority,
      completed,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function patchTasks(req, res) {
  try {
    const updates = {};

    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined)
      updates.description = req.body.description;
    if (req.body.priority !== undefined) updates.priority = req.body.priority;
    if (req.body.completed !== undefined)
      updates.completed = req.body.completed;

    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTasks(req, res) {
  try {
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Task Statistics
export async function getStats(req, res) {
  try {
    const totalTasks = await Tasks.countDocuments();
    const completedTasks = await Tasks.countDocuments({ status: "completed" });
    res.status(200).json({
      totalTasks,
      completedTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Overdue Task
export async function getOverdueTask(req, res) {
  try {
    const overTasks = await Tasks.find({
      status: "completed",
    }).sort({
      priority: -1,
    });
    res.status(200).json({
      overTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
