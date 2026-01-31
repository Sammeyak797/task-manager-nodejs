import { useState } from "react";
import "./styles/form.css";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onAdd({ title, description, priority });

        setTitle("");
        setDescription("");
        setPriority("medium");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button>Add</button>
        </form>
    );
}
