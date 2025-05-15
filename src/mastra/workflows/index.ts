import { z } from 'zod'
import { createWorkflow, createStep } from '@mastra/core/workflows/vNext'

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

const echoUrlStep = createStep({
  id: 'echo-url',
  description: 'Repeat back the provided company URL',
  inputSchema: z.object({
    companyUrl: z.string()
  }),
  outputSchema: z.object({
    message: z.string()
  }),
  execute: async ({ inputData }) => {
    return {
      message: `The company URL you provided is: ${inputData.companyUrl}`
    }
  }
})

export const companyUrlWorkflow = createWorkflow({
  id: 'company-url-workflow',
  description:
    'A simple workflow that asks for a company URL and repeats it back',
  inputSchema: z.object({
    companyUrl: z.string().url('Please enter a valid URL')
  }),
  outputSchema: z.object({
    message: z.string()
  }),
  steps: [getCompanyUrlStep, echoUrlStep]
})
  .then(getCompanyUrlStep)
  .then(echoUrlStep)
  .commit()
