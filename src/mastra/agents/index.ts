import { openai } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
import { MCPClient } from '@mastra/mcp'
import dotenv from 'dotenv'

dotenv.config()

// Prepare the Smithery API key and Exa API key config for CLI
const smitheryApiKey = process.env.SMITHERY_API_KEY || ''
const exaApiKey = process.env.EXA_API_KEY || ''
const exaConfig = `"{\\\"exaApiKey\\\":\\\"${exaApiKey}\\\"}"`

// Configure the Smithery-hosted Exa MCP server
const mcp = new MCPClient({
  servers: {
    exa: {
      command: 'npx',
      args: [
        '-y',
        '@smithery/cli@latest',
        'run',
        'exa',
        '--key',
        smitheryApiKey,
        '--config',
        exaConfig
      ]
    }
  }
})

export const mastraAgent = new Agent({
  name: 'Invoice Agent',
  instructions: `
      You are a helpful assistant, which helps create invoices.
`,
  model: openai('gpt-4o'),
  tools: await mcp.getTools()
})
