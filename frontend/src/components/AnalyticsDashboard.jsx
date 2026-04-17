import { useState, useEffect } from "react";
import { getAnalytics } from "../services/api";

const SEVERITY_COLORS = {
    low: "#4CAF50",
    medium: "#FF9800",
    high: "#f44336",
    critical: "#9C27B0"
};

function StatCard({ label, value, color }) {
    return (
        <div style={{
            backgroundColor: "#16213e",
            border: `1px solid ${color || "#0f3460"}`,
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            flex: 1
        }}>
            <p style={{ color: "#a8a8b3", fontSize: "13px", margin: "0 0 8px 0" }}>{label}</p>
            <p style={{ color: color || "#ffffff", fontSize: "32px", fontWeight: "700", margin: 0 }}>
                {value}
            </p>
        </div>
    )
}

function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const data = await getAnalytics();
                setAnalytics(data);
            } catch (err) {
                console.error("Failed to load analytics");
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, []);

    if (loading) return (
        <p style={{ color: "#a8a8b3", textAlign: "center" }}>Loading analytics...</p>
    );

    if (!analytics) return null;

    return (
        <div style={{
            backgroundColor: "#16213e",
            border: "1px solid #0f3460",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "32px"
        }}>
           <h2 style={{ color: "#ffffff", marginTop: 0, marginBottom: "20px" }}>
               📊 Analytics Dashboard
           </h2>

            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <StatCard
                    label="Bugs Last 7 Days"
                    value={analytics.bugs_last_7_days}
                    color="#e94560"
                />
                <StatCard
                    label="Total Games Tracked"
                    value={analytics.games.length}
                    color="#4CAF50"
                />
                <StatCard
                    label="Total Bug Reports"
                    value={analytics.games.reduce((sum, g) => sum + g.total_bugs, 0)}
                    color="#FF9800"
                />
            </div>

            <h3 style={{ color: "a8a8b3", fontSize: "14px", marginBottom: "12px" }}>
                Bugs by Game
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #0f3460" }}>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Game</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Total</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Open</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Confirmed</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Patched</th>
                    </tr>
                </thead>
                <tbody>
                    {analytics.games.map((game) => (
                        <tr key={game.game_name} style={{ borderBottom: "1px solid #0f3460" }}>
                            <td style={{ color: "#ffffff", padding: "10px 8px", fontSize: "14px" }}>{game.game_name}</td>
                            <td style={{ color: "#ffffff", padding: "10px 8px", fontSize: "14px" }}>{game.total_bugs}</td>
                            <td style={{ color: "#e94560", padding: "10px 8px", fontSize: "14px" }}>{game.open_bugs}</td>
                            <td style={{ color: "#FF9800", padding: "10px 8px", fontSize: "14px" }}>{game.confirmed_bugs}</td>
                            <td style={{ color: "#4CAF50", padding: "10px 8px", fontSize: "14px" }}>{game.patched_bugs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 style={{ color: "#a8a8b3", fontSize: "14px", marginBottom: "12px" }}>
                Severity Breakdown
            </h3>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                {analytics.severity_breakdown.map((item) => (
                    <div key={item.severity} style={{
                        backgroundColor: "#0f3460",
                        borderRadius: "8px",
                        padding: "12px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{
                            color: SEVERITY_COLORS[item.severity],
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            margin: "0 0 4px 0"
                        }}>
                            {item.severity}
                        </p>
                        <p style={{ color: "#ffffff", fontSize: "24px", fontWeight: "700", margin: 0 }}>
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>

            <h3 style={{ color: "#a8a8b3", fontSize: "14px", marginBottom: "12px" }}>
                Platform Breakdown
            </h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {analytics.platform_breakdown.map((item) => (
                    <div key={item.platform} style={{
                        backgroundColor: "#0f3460",
                        borderRadius: "8px",
                        padding: "12px 20px",
                        textAlign: "center"
                    }}>
                        <p style={{ color: "#a8a8b3", fontSize: "12px", margin: "0 0 4px 0" }}>
                            {item.platform}
                        </p>
                        <p style={{ color: "#ffffff", fontSize: "24px", fontWeight: "700", margin: 0 }}>
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnalyticsDashboard