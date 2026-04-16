import { useState } from "react";
import Header from "./components/Header";
import BugList from "./components/BugList";
import BugForm from "./components/BugForm";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    function handleBugSubmitted() {
        setRefreshKey(prev => prev + 1);
    }

  return (
    <div style={{ backgroundColor: "#1a1a2e", minHeight: "100vh" }}>
        <Header />
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
            <BugForm onBugSubmitted={handleBugSubmitted} />
            <BugList key={refreshKey} />
        </main>
    </div>
  )
}

export default App