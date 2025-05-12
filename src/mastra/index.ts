import { Mastra } from '@mastra/core/mastra'
import { VercelDeployer } from '@mastra/deployer-vercel'
import { createLogger } from '@mastra/core/logger'

import { mastraAgent } from './agents'

export const mastra = new Mastra({
  agents: { mastraAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info'
  }),
  deployer: new VercelDeployer({
    teamSlug: 'chameleon-invoice',
    projectName: 'mastra',
    token: process.env.VERCEL_TOKEN as string
  })
})
