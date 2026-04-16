function Header() {
    return (
        <header style={{
            backgroundColor: "#1a1a2e",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #e94560"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>🐛</span>
                <h1 style={{
                    color: "#e94560",
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "1px"
                }}>
                    BugHunt
                </h1>
            </div>
            <p style={{ color: "#a8a8b3", margin: 0, fontSize: "14px" }}>
                Crowdsourced Game Bug Reporting
            </p>
        </header>
    )
}

export default Header