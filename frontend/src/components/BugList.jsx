import { useState, useEffect } from "react";
import { getBugs } from "../services/api";
import BugCard from "./BugCard";

function BugList() {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchBugs() {
        try {
            const data = await getBugs();
            setBugs(data);
        } catch (err) {
            setError("Failed to load bug reports. Is the backend running?");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBugs();
    }, []);

    if (loading) return (
        <p style={{ color: "#a8a8b3", textAlign: "center", padding: "40px" }}>
            Loading bug reports...
        </p>
    );

    if (error) return (
        <p style={{ color:"#e94560", textAlign: "center", padding: "40px" }}>
            {error}
        </p>
    );

    if (bugs.length === 0) return (
        <p style={{ color: "#a8a8b3", textAlign: "center", padding: "40px" }}>
            No bug reports yet. Be the first to report one!
        </p>
    );

    return (
        <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>
                Bug Reports ({bugs.length})
            </h2>
            {bugs.map((bug) => (
                <BugCard
                    key={bug.bug_report_id}
                    bug={bug}
                    onUpvote={fetchBugs}
                />
            ))}
        </div>
    )
}

export default BugList