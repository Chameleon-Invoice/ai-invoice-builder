import { openai } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
import { MCPClient } from '@mastra/mcp'
import dotenv from 'dotenv'

dotenv.config()

// Prepare the Smithery API key and Exa API key config for CLI
const smitheryApiKey = process.env.SMITHERY_API_KEY || ''
const exaApiKey = process.env.EXA_API_KEY || ''
const exaConfig = `"{\\\"exaApiKey\\\":\\\"${exaApiKey}\\\"}"`
const resendProfile = process.env.RESEND_PROFILE || ''
const senderEmail = process.env.RESEND_SENDER_EMAIL_ADDRESS || ''
const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL_ADDRESS || ''

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

export const mastraAgent = new Agent({
  name: 'Invoice Agent',
  instructions: `
      You are a helpful assistant, which helps create invoices.

      Use the mcp-send-email tool to send emails.

      Before sending, always format the email in markdown like this:

      to: <recipient email>
      subject: <subject line>
      text: <plain text body>
      html: <optional, HTML body>

      Only include fields the user provides or confirms. Do not invent or autofill addresses.

      Do not ask to cc or bcc anyone
      Do not preview the email. Do not ask to confirm. Do not schedule the email, send it out immediately.

      
`,
  model: openai('gpt-4o'),
  tools: await mcp.getTools()
})
