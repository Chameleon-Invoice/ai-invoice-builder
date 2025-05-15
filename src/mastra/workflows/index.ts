import { z } from 'zod'
import { createWorkflow, createStep } from '@mastra/core/workflows/vNext'
import { mcpTools } from '../tools'

const getCompanyUrlStep = createStep({
  id: 'get-company-url',
  description: 'Collect and validate the company URL',
  inputSchema: z.object({
    companyUrl: z.string().url('Please enter a valid URL')
  }),
  outputSchema: z.object({
    companyUrl: z.string()
  }),
  execute: async ({ inputData }) => {
    return {
      companyUrl: inputData.companyUrl
    }
  }
})

const webSearchExaStep = createStep({
  id: 'web-search-exa',
  description: 'Call Exa MCP web_search_exa tool with workflow input',
  inputSchema: z.object({
    companyUrl: z.string()
  }),
  outputSchema: z.object({
    companyUrl: z.string(),
    webResults: z.any()
  }),
  execute: async ({ inputData }) => {
    try {
      const params = {
        query: inputData.companyUrl,
        numResults: 3
      }

      console.log(mcpTools)
      const webResults = await mcpTools.exa_web_search_exa.execute({
        context: params
      })

      return { companyUrl: inputData.companyUrl, webResults }
    } catch (error) {
      console.error('Web search error:', error)

      return {
        companyUrl: inputData.companyUrl,
        webResults: { error: 'Web search failed', url: inputData.companyUrl }
      }
    }
  }
})

export const companyUrlWorkflow = createWorkflow({
  id: 'company-url-workflow',
  description:
    'A simple workflow that asks for a company URL, does a web search with it, and repeats it back',
  inputSchema: z.object({
    companyUrl: z.string().url('Please enter a valid URL')
  }),
  outputSchema: z.object({
    message: z.string(),
    webResults: z.any()
  }),
  steps: [getCompanyUrlStep, webSearchExaStep]
})
  .then(getCompanyUrlStep)
  .then(webSearchExaStep)
  .commit()
