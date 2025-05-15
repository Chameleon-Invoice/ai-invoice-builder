import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { mastraAgent } from "./agents";
import { companyUrlWorkflow } from "./workflows";

export const mastra = new Mastra({
  agents: { mastraAgent },
  vnext_workflows: {
    companyUrlWorkflow,
  },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
