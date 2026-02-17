# 📝 Task Manager Application

A full-stack Task Management application built using:

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **React (Vite)**

This project demonstrates clean architecture, RESTful API design, MongoDB aggregation queries, filtering, sorting, and frontend state management.

---

# 🚀 Features

## 🔹 Backend Features

- Create, read, update, delete tasks
- Filter tasks by:
  - Completion status
  - Priority
- Sorting support via query parameters
- MongoDB aggregation for task statistics
- Overdue task detection (incomplete tasks older than 7 days)
- Enum validation for priority (`low`, `medium`, `high`)
- Proper error handling (400 / 404 / 500)
- Service layer architecture (business logic separated from controllers)
- Configured CORS for frontend access

---

## 🔹 Frontend Features

- Add new tasks with validation (min 3 characters)
- Toggle task completion
- Delete tasks
- Filter tasks by status and priority
- Responsive UI layout
- Priority-based visual indicators
- Completed task styling (muted + strikethrough)
- Clean and modern UI design

---

# 📦 Project Setup

Clone the repository:

```bash
git clone <your-repo-url>
cd project
```
