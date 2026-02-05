from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Landing Page Rebrand
            print("Navigating to Home...")
            page.goto("http://localhost:3000")
            page.wait_for_selector("text=THE TECH STACK")
            page.screenshot(path="verification/home_rebrand.png")
            print("Captured home_rebrand.png")

            # 2. Marketplace
            print("Navigating to Marketplace...")
            page.goto("http://localhost:3000/plugins")
            page.wait_for_selector("text=Plugin Marketplace")
            page.screenshot(path="verification/marketplace.png")
            print("Captured marketplace.png")

            # 3. Docs
            print("Navigating to Docs...")
            page.goto("http://localhost:3000/docs/intro/what-is-zhinnx")
            page.wait_for_selector("text=What is ZhinNX?")
            # Verify Sidebar
            page.wait_for_selector("text=GETTING STARTED")
            page.screenshot(path="verification/docs.png")
            print("Captured docs.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_rebrand.png")

        browser.close()

if __name__ == "__main__":
    run()
