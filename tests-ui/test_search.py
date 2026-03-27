from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_search_product(driver):
    wait = WebDriverWait(driver, 10)

    search_input = wait.until(
        EC.visibility_of_element_located((By.ID, "searchInput"))
    )
    search_input.clear()
    search_input.send_keys("цемент")

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "productsList"),
            "Цемент"
        )
    )

    products_text = driver.find_element(By.ID, "productsList").text.lower()

    assert "цемент" in products_text