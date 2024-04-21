import z from 'zod'
import { chromium } from 'playwright'
import LLMScraper from './../src'

// Create a new browser instance
const browser = await chromium.launch()

// Initialize the LLMScraper instance
const scraper = new LLMScraper(browser)

// Define schema to extract contents into
const schema = z.object({
  title: z.string().describe('Title of the webpage'),
})

// URLs to scrape
const urls = [
  'https://ft.com',
  'https://text.npr.org',
  'https://meduza.io',
  'https://theguardian.com',
]

// Run the scraper
const pages = await scraper.run(urls, {
  model: 'gpt-4-turbo',
  schema,
  mode: 'text',
  closeOnFinish: true,
})

// Stream the result from LLM
for await (const page of pages) {
  console.log(`Page Title: ${page.data?.title}`)
}