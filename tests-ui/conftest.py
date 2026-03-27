import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

BASE_URL = "http://127.0.0.1:5500"
API_URL = "http://localhost:3000/api"


@pytest.fixture
def driver():
    try:
        requests.post(f"{API_URL}/test/reset", timeout=2)
    except:
        pass

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=options)

    driver.get(BASE_URL)
    yield driver
    driver.quit()