import pytest
import requests

BASE_URL = "http://localhost:5173"
API_URL = "http://127.0.0.1:8000"

#--- API Tests -----------------------------------------------------
def test_get_bugs_returns_200():
    response = requests.get(f"{API_URL}/bugs/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_games_returns_200():
    response = requests.get(f"{API_URL}/games/")
    assert response.status_code == 200
    assert len(response.json()) >= 5

def test_post_bug_invalid_severity_returns_422():
    games = requests.get(f"{API_URL}/games/").json()
    game_id = str(games[0]["game_id"])
    response = requests.post(
        f"{API_URL}/bugs/",
        params={"user_id": "df662ddf-192d-4ddd-bdf0-4d943f631831"},
        json={
            "game_id": game_id,
            "title": "Test bug",
            "description": "Test description",
            "severity": "catastrophic",
            "steps_to_reproduce": "Test steps",
            "platform": "PC"
        }
    )
    assert response.status_code == 422

def test_post_bug_missing_title_returns_422():
    games = requests.get(f"{API_URL}/games/").json()
    game_id = str(games[0]["game_id"])
    response = requests.post(
        f"{API_URL}/bugs/",
        params={"user_id": "df662ddf-192d-4ddd-bdf0-4d943f631831"},
        json={
            "game_id": game_id,
            "description": "Test description",
            "severity": "low",
            "steps_to_reproduce": "Test steps",
            "platform": "PC"
        }
    )
    assert response.status_code == 422

def test_patch_bug_invalid_status_returns_422():
    bugs = requests.get(f"{API_URL}/bugs/").json()
    bug_id = str(bugs[0]["bug_report_id"])
    response = requests.patch(
        f"{API_URL}/bugs/{bug_id}/status",
        json={"status": "resolved"}
    )
    assert response.status_code == 422

def test_patch_bug_nonexistent_id_returns_404():
    response = requests.patch(
        f"{API_URL}/bugs/00000000-0000-0000-0000-000000000000/status",
        json={"status": "confirmed"}
    )
    assert response.status_code == 404

def test_duplicate_upvote_returns_400():
    upvotes = requests.get(f"{API_URL}/bugs/").json()
    bug_id = str(upvotes[0]["bug_report_id"])
    user_id = "df662ddf-192d-4ddd-bdf0-4d943f631831"
    requests.post(
        f"{API_URL}/bugs/{bug_id}/upvote",
        params={"user_id": user_id}
    )
    response = requests.post(
        f"{API_URL}/bugs/{bug_id}/upvote",
        params={"user_id": user_id}
    )
    assert response.status_code == 400

#--- UI Tests -----------------------------------------------------
def test_homepage_loads(page):
    page.goto(BASE_URL)
    assert "BugHunt" in page.title() or page.locator("h1").inner_text() == "BugHunt"

def test_bug_list_loads(page):
    page.goto(BASE_URL)
    page.wait_for_timeout(2000)
    content = page.content()
    assert "Bug Reports" in content

def test_bug_form_submission(page):
    page.goto(BASE_URL)
    page.wait_for_selector("select")
    page.locator("select").first.select_option(index=1)
    page.locator("input[name='title']").fill("Automated test bug")
    page.locator("textarea[name='description']").fill("This is an automated test")
    page.locator("select[name='severity']").select_option("high")
    page.locator("textarea[name='steps_to_reproduce']").fill("1. Run test 2. See result")
    page.locator("input[name='platform']").fill("PC")
    page.locator("button[type='submit']").click()
    page.wait_for_timeout(1000)
    success = page.locator("text=Bug report submitted successfully").is_visible()
    assert success