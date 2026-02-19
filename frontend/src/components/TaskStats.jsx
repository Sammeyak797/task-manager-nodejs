import { useEffect, useState } from "react";
import { getTaskStats } from "../services/api";
import "./styles/stats.css";

export default function TaskStats() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getTaskStats();
                setStats(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, []);

    // 🔥 Transform data
    const formatted = {
        high: { completed: 0, pending: 0 },
        medium: { completed: 0, pending: 0 },
        low: { completed: 0, pending: 0 },
    };

    stats.forEach((item) => {
        const { priority, completed } = item._id;

        if (completed) {
            formatted[priority].completed = item.count;
        } else {
            formatted[priority].pending = item.count;
        }
    });

    return (
        <div className="stats-container">
            <h2>📊 Task Stats</h2>

            <div className="stats-grid">
                {Object.entries(formatted).map(([priority, data]) => (
                    <div key={priority} className={`stats-card ${priority}`}>
                        <h3>{priority.toUpperCase()}</h3>

                        <p>✅ Completed: {data.completed}</p>
                        <p>⏳ Pending: {data.pending}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
