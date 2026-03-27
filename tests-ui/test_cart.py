from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_add_product_to_cart(driver):
    wait = WebDriverWait(driver, 10)

    wait.until(EC.visibility_of_element_located((By.ID, "productsList")))

    add_buttons = driver.find_elements(By.CLASS_NAME, "secondary-btn")
    assert len(add_buttons) > 0

    add_buttons[0].click()

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "cartList"),
            "Цемент"
        )
    )

    cart_text = driver.find_element(By.ID, "cartList").text
    assert "Цемент" in cart_text


def test_change_quantity_in_cart(driver):
    wait = WebDriverWait(driver, 10)

    wait.until(EC.visibility_of_element_located((By.ID, "productsList")))

    add_buttons = driver.find_elements(By.CLASS_NAME, "secondary-btn")
    add_buttons[0].click()

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "cartList"),
            "Цемент"
        )
    )

    qty_buttons = driver.find_elements(By.CLASS_NAME, "qty-btn")
    assert len(qty_buttons) >= 2

    plus_button = qty_buttons[1]
    plus_button.click()

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "cartList"),
            "Количество: 2"
        )
    )

    cart_text = driver.find_element(By.ID, "cartList").text
    assert "Количество: 2" in cart_text