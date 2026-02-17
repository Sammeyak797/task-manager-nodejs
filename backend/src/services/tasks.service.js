import Tasks from "../models/tasks.model.js";

// GET with filtering + sorting
export async function fetchTasks(query) {
  const { completed, priority, sort } = query;

  let filter = {};

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  if (priority) {
    filter.priority = priority;
  }

  let sortOption = { createdAt: -1 };

  if (sort) {
    sortOption = { [sort]: 1 };
  }

  return await Tasks.find(filter).sort(sortOption);
}

// CREATE
export async function createTask(data) {
  return await Tasks.create(data);
}

// TOGGLE completion
export async function toggleTask(id) {
  const task = await Tasks.findById(id);

  if (!task) {
    throw new Error("NOT_FOUND");
  }

  task.completed = !task.completed;
  await task.save();

  return task;
}

// DELETE
export async function removeTask(id) {
  const task = await Tasks.findByIdAndDelete(id);

  if (!task) {
    throw new Error("NOT_FOUND");
  }

  return task;
}

// STATS aggregation
export async function getTaskStats() {
  return await Tasks.aggregate([
    {
      $group: {
        _id: {
          priority: "$priority",
          completed: "$completed",
        },
        count: { $sum: 1 },
      },
    },
  ]);
}

// OVERDUE
export async function getOverdueTasks() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await Tasks.aggregate([
    {
      $match: {
        completed: false,
        createdAt: { $lt: sevenDaysAgo },
      },
    },
    {
      $addFields: {
        priorityOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$priority", "high"] }, then: 1 },
              { case: { $eq: ["$priority", "medium"] }, then: 2 },
              { case: { $eq: ["$priority", "low"] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },
    {
      $sort: { priorityOrder: 1 },
    },
  ]);
}
