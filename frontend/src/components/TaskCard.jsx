import "./styles/task.css";

export default function TaskCard({ task, onToggle, onDelete }) {
    return (
        <div
            className={`task-card ${task.priority} ${task.completed ? "completed" : ""
                }`}
        >
            <div className="task-info">
                <h3 className={task.completed ? "completed-text" : ""}>
                    {task.title}
                </h3>

                {task.description && <p>{task.description}</p>}

                <span className={`priority ${task.priority}`}>
                    {task.priority}
                </span>
            </div>

            <div className="task-actions">
                <button onClick={() => onToggle(task)}>
                    {task.completed ? "Undo" : "Done"}
                </button>

                <button
                    className="delete"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
