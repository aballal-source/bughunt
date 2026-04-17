import { useState } from "react";
import Header from "./components/Header";
import BugList from "./components/BugList";
import BugForm from "./components/BugForm";
import AdminPanel from "./components/AdminPanel";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { getBugs } from "./services/api";
import { useEffect } from "react";

const IS_ADMIN = true;
const CURRENT_USER_ID = "df662ddf-192d-4ddd-bdf0-4d943f631831";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [bugs, setBugs] = useState([]);
    const [activeTab, setActiveTab] = useState("bugs");

    useEffect(() => {
        async function fetchBugs() {
            try {
                const data = await getBugs();
                setBugs(data);
            } catch (err) {
                console.error("Failed to fetch bugs");
            }
        }
        fetchBugs();
    }, [refreshKey]);

    function handleBugSubmitted() {
        setRefreshKey(prev => prev + 1);
    }

    const tabStyle = (tab) => ({
        padding: "10px 24px",
        cursor: "pointer",
        border: "none",
        borderBottom: activeTab === tab ? "2px solid #e94560" : "2px solid transparent",
        backgroundColor: "transparent",
        color: activeTab === tab ? "#e94560" : "#a8a8b3",
        fontSize: "15px",
        fontWeight: "600"
    });

  return (
    <div style={{ backgroundColor: "#1a1a2e", minHeight: "100vh" }}>
        <Header />
        <div style={{ borderBottom: "1px solid #0f3460", display: "flex", paddingLeft: "32px" }}>
            <button style={tabStyle("bugs")} onClick={() => setActiveTab("bugs")}>
                Bug Reports
            </button>
            {IS_ADMIN && (
                <button style={tabStyle("admin")} onClick={() => setActiveTab("admin")}>
                    Admin Panel
                </button>
            )}
            <button style={tabStyle("analytics")} onClick={() => setActiveTab("analytics")}>
                Analytics
            </button>
        </div>
        <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
            {activeTab === "bugs" && (
                <>
                    <BugForm onBugSubmitted={handleBugSubmitted} />
                    <BugList key={refreshKey} />
                </>
            )}
            {activeTab === "admin" && IS_ADMIN && (
                <AdminPanel bugs={bugs} onStatusUpdate={handleBugSubmitted} />
            )}
            {activeTab === "analytics" && (
                <AnalyticsDashboard />
            )}
        </main>
    </div>
  )
}

export default App