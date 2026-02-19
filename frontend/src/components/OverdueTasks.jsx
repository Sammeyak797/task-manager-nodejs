import TaskCard from "./TaskCard";
import "./styles/overdue.css";

export default function OverdueTasks({ tasks, onToggle, onDelete }) {
    if (!tasks || tasks.length === 0) return null;

    return (
        <section className="overdue-section">
            <div className="overdue-header">
                <h2>⚠️ Overdue Tasks</h2>
                <span className="overdue-count">{tasks.length}</span>
            </div>

            <div className="overdue-list">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        isOverdue={true}
                    />
                ))}
            </div>
        </section>
    );
}
