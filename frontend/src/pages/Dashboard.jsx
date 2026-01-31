import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async (task) => {
        const res = await createTask(task);
        setTasks([res.data, ...tasks]);
    };

    const handleToggle = async (task) => {
        const res = await updateTask(task._id, {
            completed: !task.completed,
        });

        setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t._id !== id));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Task Manager</h1>

            <TaskForm onAdd={handleAdd} />

            {tasks.length === 0 && <p>No tasks yet.</p>}

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
