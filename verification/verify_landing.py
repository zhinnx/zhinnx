from playwright.sync_api import sync_playwright

def verify(page):
    print("Navigating...")
    page.goto("http://localhost:3000")
    print("Waiting for hero...")
    page.wait_for_selector("#hero-text")

    # Wait for animation (GSAP is 1s)
    page.wait_for_timeout(1500)

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/landing_screenshot.png", full_page=True)

    # Assert
    title = page.title()
    print(f"Title: {title}")
    assert "ZhinStack" in title

    # Check H1
    h1 = page.locator("h1").inner_text()
    print(f"H1: {h1}")
    assert "Develop with" in h1

    print("Verification Passed")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
