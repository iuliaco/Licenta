from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.firefox import GeckoDriverManager
from PIL import Image
opts = webdriver.FirefoxOptions()
opts.add_argument("--headless")

driver = webdriver.Firefox(executable_path=GeckoDriverManager().install(), options=opts)

driver.get("http://www.roamaround.io")
assert "Roam" in driver.title
elem1 = driver.find_element(By.TAG_NAME, "button")
print(elem1)
elem2 = driver.find_elements(By.TAG_NAME, "input")
print(elem2)

elem2[0].send_keys("Bucharest")
elem2[2].send_keys("3")
#elem2[1].send_keys("31/03/2023")


elem1.click

WebDriverWait(driver, 10)

driver.save_screenshot("ss.png")
screenshot = Image.open("ss.png")
screenshot.show()


assert "No results found." not in driver.page_source
driver.close()
