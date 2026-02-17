import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState({
        completed: "",
        priority: "",
    });

    const fetchTasks = async (filters = {}) => {
        try {
            setLoading(true);
            const res = await getTasks(filters);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(filter);
    }, [filter]);

    const handleAdd = async (task) => {
        const res = await createTask(task);
        setTasks((prev) => [res.data, ...prev]);
    };

    const handleToggle = async (task) => {
        const res = await updateTask(task._id);
        setTasks((prev) =>
            prev.map((t) => (t._id === task._id ? res.data : t))
        );
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Task Manager</h1>

            {/* Filter Dropdown */}
            <div className="filter-bar">
                <select name="completed" onChange={handleFilterChange}>
                    <option value="">All Status</option>
                    <option value="true">Completed</option>
                    <option value="false">Pending</option>
                </select>

                <select name="priority" onChange={handleFilterChange}>
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <TaskForm onAdd={handleAdd} />

            {tasks.length === 0 && <p>No tasks found.</p>}

            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
