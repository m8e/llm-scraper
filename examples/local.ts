import { chromium } from 'playwright'
import { LlamaModel } from 'node-llama-cpp'
import { z } from 'zod'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

const modelPath =
  '/Users/mish/jan/models/tinyllama-1.1b/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf'

const llm = new LlamaModel({ modelPath })

// Initialize a new LLMScraper with local model
const scraper = new LLMScraper(browser, llm)

// Define schema to extract contents into
const schema = z.object({
  h1: z.string().describe('The main heading of the page'),
})

// URLs to scrape
const urls = ['https://example.com', 'https://browserbase.com']

// Run the scraper
const pages = await scraper.run(urls, {
  schema,
  mode: 'text',
  closeOnFinish: true,
})

// Stream the result from LLM
for await (const page of pages) {
  console.log(page.data)
}
