import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import OverdueTasks from "../components/OverdueTasks";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getOverdueTasks,
} from "../services/api";
import TaskStats from "../components/TaskStats";


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState({
        completed: "",
        priority: "",
    });

    // 🔥 FETCH ALL DATA
    const fetchData = async () => {
        try {
            setLoading(true);

            const [tasksRes, overdueRes] = await Promise.all([
                getTasks(filter),
                getOverdueTasks(),
            ]);

            setTasks(tasksRes.data);
            setOverdueTasks(overdueRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter.completed, filter.priority]);

    // ADD
    const handleAdd = async (task) => {
        try {
            const res = await createTask(task);
            setTasks((prev) => [res.data, ...prev]);
            fetchData(); // 🔥 single refresh
        } catch (err) {
            console.error(err);
        }
    };

    // TOGGLE
    const handleToggle = async (task) => {
        try {
            const res = await updateTask(task._id);

            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? res.data : t))
            );

            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t._id !== id));
            fetchData();
        } catch (err) {
            console.error(err);
        }
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

            <TaskStats />

            {/* FILTER */}
            <div className="filters-container">
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
            </div>


            {/* FORM */}
            <TaskForm onAdd={handleAdd} />

            {/* 🔥 CLEAN LAYOUT */}
            <div className="task-layout">
                <OverdueTasks
                    tasks={overdueTasks}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />

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
        </div>
    );
}
