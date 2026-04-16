import { useState, useEffect } from "react";
import { createBug, getGames } from "../services/api";

function BugForm({ onBugSubmitted }) {
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({
        game_id: "",
        title: "",
        description: "",
        severity: "low",
        steps_to_reproduce: "",
        platform: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                const data = await getGames();
                setGames(data);
            } catch (err) {
                console.error("Failed to load games");
            }
        }
        fetchGames();
    }, []);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createBug(formData, "df662ddf-192d-4ddd-bdf0-4d943f631831");
            setMessage({ type: "success", text: "Bug report submitted successfully!" });
            setFormData({
                game_id: "",
                title: "",
                description: "",
                severity: "low",
                steps_to_reproduce: "",
                platform: ""
            });
            onBugSubmitted();
        } catch (err) {
            setMessage({ type: "error", text: "Failed to submit bug report." });
        } finally {
            setSubmitting(false);
        }
    }

    const inputStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#0f3460",
        border: "1px solid #1a1a2e",
        borderRadius: "6px",
        color: "#ffffff",
        fontSize: "14px",
        marginBottom: "16px",
        boxSizing: "border-box"
    };

    return (
        <div style={{
            backgroundColor: "#16213e",
            border: "1px solid #0f3460",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "32px"
        }}>
            <h2 style={{ color: "#ffffff", marginTop: 0, marginBottom: "20px" }}>
                Report a Bug
            </h2>

            {message && (
                <p style={{
                    color: message.type === "success" ? "#4CAF50" : "#e94560",
                    marginBottom: "16px"
                }}>
                    {message.text}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>Game</label>
                <select
                    name="game_id"
                    value={formData.game_id}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                >
                    <option value="">Select a game</option>
                    {games.map((game) => (
                        <option key={game.game_id} value={game.game_id}>
                            {game.game_name}
                        </option>
                    ))}
                </select>

                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of the bug"
                    style={inputStyle}
                />

                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="What happened?"
                    rows={3}
                    style={inputStyle}
                />

                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>Severity</label>
                <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>

                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>
                    Steps to Reproduce
                </label>
                <textarea
                    name="steps_to_reproduce"
                    value={formData.steps_to_reproduce}
                    onChange={handleChange}
                    required
                    placeholder="1. Open game 2. ..."
                    rows={3}
                    style={inputStyle}
                />

                <label style={{ color: "#a8a8b3", fontSize: "14px" }}>Platform</label>
                <input
                    type="text"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                    placeholder="PC, PS5, Xbox, Switch..."
                    style={inputStyle}
                />

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        backgroundColor: "#e94560",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "12px 24px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                        width: "100%"
                    }}
                >
                    {submitting ? "Submitting..." : "Submit Bug Report"}
                </button>
            </form>
        </div>
    )
}

export default BugForm