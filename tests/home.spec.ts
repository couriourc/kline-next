import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
const baseURL = "http://localhost:3000";
const env = dotenv.config({ path: ".env" }).parsed!;

test("env file", async ({ page }) => {
  await page.goto(baseURL);
  // Expect a title from env NEXT_PUBLIC_CHART_WEBSITE_NAME.
  await expect(page).toHaveTitle(env.NEXT_PUBLIC_CHART_WEBSITE_NAME);
});
