import { upvoteBug } from "../services/api";

const SEVERITY_COLORS = {
    low: "#4CAF50",
    medium: "#FF9800",
    high: "#f44336",
    critical: "#9C27B0"
};

const STATUS_COLORS = {
    open: "#e94560",
    confirmed: "#FF9800",
    patched: "#4CAF50"
};

function BugCard({ bug, onUpvote }) {
    async function handleUpvote() {
        try {
            await upvoteBug(bug.bug_report_id, "df662ddf-192d-4ddd-bdf0-4d943f631831");
            onUpvote();
        } catch (error) {
            alert("You have already upvoted this bug report");
        }
    }

    return (
        <div style ={{
            backgroundColor: "#16213e",
            border: "1px solid #0f3460",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "16px"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "18px" }}>
                    {bug.title}
                </h3>
                <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{
                        backgroundColor: SEVERITY_COLORS[bug.severity],
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase"
                    }}>
                        {bug.severity}
                    </span>
                    <span style={{
                        backgroundColor: STATUS_COLORS[bug.status],
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase"
                    }}>
                        {bug.status}
                    </span>
                </div>
            </div>

            <p style={{ color: "#a8a8b3", fontSize: "14px", margin: "0 0 12px 0" }}>
                🎮 {bug.game_name} &nbsp; |&nbsp; 💻 {bug.platform} &nbsp;|&nbsp; 👤 {bug.username}
            </p>

            <p style={{ color: "e0e0e0", fontSize: "15px", margin: "0 0 12px 0"}}>
                {bug.description}
            </p>

            <details style={{ marginBottom: "12px" }}>
                <summary style={{ color: "#a8a8b3", cursor: "pointer", fontSize: "14px" }}>
                    Steps to reproduce
                </summary>
                <p style={{ color: "e0e0e0", fontSize: "14px", marginTop: "8px" }}>
                    {bug.steps_to_reproduce}
                </p>
            </details>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                    onClick={handleUpvote}
                    style={{
                        backgroundColor: "#0f3460",
                        color: "e94560",
                        border: "1px solid #e94560",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600"
                    }}
                >
                    ▲ Upvote ({bug.upvote_count})
                </button>
                <span style={{ color: "#a8a8b3", fontSize: "13px" }}>
                    Reported {new Date(bug.created_at).toLocaleDateString()}
                </span>
            </div>
        </div>
    )
}

export default BugCard