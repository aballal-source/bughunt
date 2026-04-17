import { useState } from "react";
import { updateBugStatus } from "../services/api";

const STATUS_OPTIONS = ["open", "confirmed", "patched"];

const STATUS_COLORS = {
    open: "#e94560",
    confirmed: "#FF9800",
    patched: "#4CAF50"
};

function AdminPanel({ bugs, onStatusUpdate }) {
    const [updating, setUpdating] = useState(null);

    async function handleStatusChange(bugReportId, newStatus) {
        setUpdating(bugReportId);
        try {
            await updateBugStatus(bugReportId, newStatus);
            onStatusUpdate();
        } catch (err) {
            alert("Failed to update status");
        } finally {
            setUpdating(null);
        }
    }

    return (
        <div style={{
            backgroundColor: "#16213e",
            border: "1px solid #e94560",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "32px"
        }}>
            <h2 style={{ color: "#e94560", marginTop: 0, marginBottom: "20px" }}>
                🔧 Admin Triage Panel
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #0f3460" }}>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Title</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Game</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Severity</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Status</th>
                        <th style={{ color: "#a8a8b3", textAlign: "left", padding: "8px", fontSize: "13px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.map((bug) => (
                        <tr key={bug.bug_report_id} style={{ borderBottom: "1px solid #0f3460" }}>
                            <td style={{ color: "#ffffff", padding: "10px 8px", fontSize: "14px" }}>
                                {bug.title}
                            </td>
                            <td style={{ color: "#a8a8b3", padding: "10px 8px", fontSize: "14px" }}>
                                {bug.game_name}
                            </td>
                            <td style={{ padding: "10px 8px" }}>
                                <span style={{
                                    color: "#ffffff",
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    fontWeight: "600"
                                }}>
                                    {bug.severity}
                                </span>
                            </td>
                            <td style={{ padding: "10px 8px" }}>
                                <span style={{
                                    backgroundColor: STATUS_COLORS[bug.status],
                                    color: "white",
                                    padding: "3px 8px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase"
                                }}>
                                    {bug.status}
                                </span>
                            </td>
                            <td style={{ padding: "10px 8px" }}>
                                <select
                                    value={bug.status}
                                    onChange={(e) => handleStatusChange(bug.bug_report_id, e.target.value)}
                                    disabled={updating === bug.bug_report_id}
                                    style={{
                                        backgroundColor: "#0f3460",
                                        color: "#ffffff",
                                        border: "1px solid #a8a8b3",
                                        borderRadius: "4px",
                                        padding: "4px 8px",
                                        fontSize: "13px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPanel