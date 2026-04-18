import pytest
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:5173"
API_URL = "http://127.0.0.1:8000"

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        yield browser
        browser.close()

@pytest.fixture(scope="function")
def page(browser):
    page = browser.new_page()
    yield page
    page.close()