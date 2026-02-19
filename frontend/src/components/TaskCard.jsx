import "./styles/task.css";

export default function TaskCard({ task, onToggle, onDelete, isOverdue }) {
    return (
        <div
            className={`task-card 
        ${task.priority} 
        ${task.completed ? "completed" : ""} 
        ${isOverdue ? "overdue" : ""}`}
        >
            <div className="task-info">
                <h3 className={task.completed ? "completed-text" : ""}>
                    {task.title}
                </h3>

                {task.description && <p className="task-desc">{task.description}</p>}

                <div className="task-meta">
                    <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                    </span>

                    {isOverdue && (
                        <span className="overdue-badge">Overdue</span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button className="toggle-btn" onClick={() => onToggle(task)}>
                    {task.completed ? "Undo" : "Done"}
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
