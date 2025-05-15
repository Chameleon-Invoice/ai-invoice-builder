import { MCPClient } from '@mastra/mcp'
import dotenv from 'dotenv'

dotenv.config()

// Prepare the Smithery API key and Exa API key config for CLI
const smitheryApiKey = process.env.SMITHERY_API_KEY || ''
const exaApiKey = process.env.EXA_API_KEY || ''
const resendProfile = process.env.RESEND_PROFILE || ''
const senderEmail = process.env.RESEND_SENDER_EMAIL_ADDRESS || ''
const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL_ADDRESS || ''

// Configure the Smithery-hosted Exa MCP server
export const mcp = new MCPClient({
  servers: {
    exa: {
      command: 'npx',
      args: ['exa-mcp-server', '--tools=web_search_exa,company_research'],
      env: {
        EXA_API_KEY: exaApiKey
      }
    },
    'mcp-send-email': {
      command: 'npx',
      args: [
        '-y',
        '@smithery/cli@latest',
        'run',
        '@resend/mcp-send-email',
        '--key',
        smitheryApiKey,
        '--profile',
        resendProfile,
        '--sender',
        senderEmail,
        '--reply-to',
        replyToEmail
      ]
    }
  }
})

// Export MCP tools
export const mcpTools = await mcp.getTools()
