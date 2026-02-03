from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Go to Home
        print("Navigating to Home...")
        page.goto("http://localhost:3000")

        # Wait for content
        expect(page.locator("h1")).to_contain_text("Welcome to zhinnx")

        # Test Interaction (Counter)
        print("Testing Counter...")
        # Note: My implementation uses #inc-btn in Counter.js
        page.locator("#inc-btn").click()
        page.locator("#inc-btn").click()

        # Expect 2 (Initial is 0)
        expect(page.locator("div.text-4xl")).to_have_text("2")

        page.screenshot(path="verification/home.png")
        print("Home screenshot taken.")

        # 2. Go to About
        print("Navigating to About...")
        page.click("text=About")

        # Wait for routing
        expect(page.locator("h1")).to_contain_text("About zhinnx")

        # Wait for API message (should be "Hello from zhinnx!")
        # It initially says "Loading data from backend..." then updates.
        expect(page.locator(".font-mono")).to_contain_text("Hello from zhinnx!")

        page.screenshot(path="verification/about.png")
        print("About screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
