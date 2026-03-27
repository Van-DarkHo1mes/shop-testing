from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_checkout_without_phone_shows_error(driver):
    wait = WebDriverWait(driver, 10)

    name_input = wait.until(
        EC.visibility_of_element_located((By.ID, "name"))
    )
    phone_input = driver.find_element(By.ID, "phone")
    address_input = driver.find_element(By.ID, "address")
    submit_button = driver.find_element(By.CSS_SELECTOR, "#orderForm button[type='submit']")

    name_input.clear()
    name_input.send_keys("Иван")

    phone_input.clear()
    address_input.clear()
    address_input.send_keys("Москва")

    submit_button.click()

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "orderMessage"),
            "Телефон обязателен"
        )
    )

    message = driver.find_element(By.ID, "orderMessage").text
    assert "Телефон обязателен" in message


def test_successful_checkout(driver):
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

    name_input = driver.find_element(By.ID, "name")
    phone_input = driver.find_element(By.ID, "phone")
    address_input = driver.find_element(By.ID, "address")
    submit_button = driver.find_element(By.CSS_SELECTOR, "#orderForm button[type='submit']")

    name_input.clear()
    name_input.send_keys("Иван")

    phone_input.clear()
    phone_input.send_keys("89990001122")

    address_input.clear()
    address_input.send_keys("Москва, ул. Ленина, 1")

    submit_button.click()

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "orderMessage"),
            "Заказ оформлен"
        )
    )

    message = driver.find_element(By.ID, "orderMessage").text
    assert "Заказ оформлен" in message

    wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "cartList"),
            "Корзина пуста"
        )
    )