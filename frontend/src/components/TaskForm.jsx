import { useState } from "react";
import "./styles/form.css";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setError("Title is required");
            return;
        }

        if (trimmedTitle.length < 3) {
            setError("Title must be at least 3 characters");
            return;
        }

        onAdd({
            title: trimmedTitle,
            description: description.trim(),
            priority,
        });

        setTitle("");
        setDescription("");
        setPriority("medium");
        setError("");

    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                }}
                placeholder="Task title"
            />

            {error && <p className="error-text">{error}</p>}

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">Add Task</button>
        </form>
    );
}
