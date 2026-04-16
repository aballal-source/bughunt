const BASE_URL = "http://127.0.0.1:8000";

export async function getBugs() {
    const response = await fetch(`${BASE_URL}/bugs/`);
    if (!response.ok) throw new Error("Failed to fetch bugs");
    return response.json();
}

export async function getGames(){
    const response = await fetch(`${BASE_URL}/games/`);
    if (!response.ok) throw new Error("Failed to fetch games");
    return response.json();
}

export async function createBug(bugData, userId) {
    const response = await fetch(`${BASE_URL}/bugs/?user_id=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bugData),
    });
    if (!response.ok) throw new Error("Failed to create bug report");
    return response.json();
}

export async function updateBugStatus(bugReportId, status) {
    const response = await fetch(`${BASE_URL}/bugs/${bugReportId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update status");
    return response.json();
}

export async function upvoteBug(bugReportId, userId) {
    const response = await fetch(
        `${BASE_URL}/bugs/${bugReportId}/upvote?user_id=${userId}`,
        { method: "POST" }
    );
    if (!response.ok) throw new Error("Failed to upvote");
    return response.json();
}