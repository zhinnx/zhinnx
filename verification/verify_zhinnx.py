from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Landing Page
            print("Navigating to Home...")
            page.goto("http://localhost:3000")
            page.wait_for_selector("text=ZhinNX")
            page.screenshot(path="verification/home.png")
            print("Captured home.png")

            # 2. Font Builder
            print("Navigating to Font Builder...")
            page.goto("http://localhost:3000/font")
            page.wait_for_selector("text=Font Builder")
            page.screenshot(path="verification/font.png")
            print("Captured font.png")

            # 3. YTDL
            print("Navigating to YTDL...")
            page.goto("http://localhost:3000/ytdl")
            page.wait_for_selector("text=YouTube Downloader")
            page.screenshot(path="verification/ytdl.png")
            print("Captured ytdl.png")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        browser.close()

if __name__ == "__main__":
    run()
