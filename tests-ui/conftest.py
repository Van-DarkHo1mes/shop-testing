import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

BASE_URL = "http://127.0.0.1:5500"
API_URL = "http://localhost:3000/api"


@pytest.fixture
def driver():
    requests.post(f"{API_URL}/test/reset")

    options = Options()
    options.add_argument("--start-maximized")

    driver = webdriver.Chrome(options=options)
    driver.get(BASE_URL)
    yield driver
    driver.quit()