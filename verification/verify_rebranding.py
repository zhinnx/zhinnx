from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Go to Home
        print("Navigating to Home...")
        page.goto("http://localhost:3000")

        # Expect "ZhinNX" in title
        expect(page).to_have_title("ZhinNX - The Modern Tech Stack")

        # Check CLI code block
        # Found by text content or code tag
        # The first code block in Install section
        expect(page.locator("code").filter(has_text="npx @zhinnx/cli create")).to_be_visible()

        # Check "Why ZhinNX?" section text update
        expect(page.get_by_text("ZhinNX is not a walled garden")).to_be_visible()

        page.screenshot(path="verification/home_rebrand.png")
        print("Home screenshot taken.")

        # 2. Go to Docs
        print("Navigating to Docs...")
        page.goto("http://localhost:3000/docs")

        # Expect Documentation page
        expect(page.locator("h1")).to_have_text("Documentation")

        page.screenshot(path="verification/docs.png")
        print("Docs screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
