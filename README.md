# Chameleon Invoice Builder

_Effortless, AI-powered invoicing for freelancers and small businesses._

[![Mastra Build Hackathon Entry](https://img.shields.io/badge/Mastra-Hackathon-blue)](https://mastra.ai/hackathon)

## Project Overview

Most people get incredibly frustrated when creating invoices. Existing solutions are a struggle—cumbersome, slow, and anything but delightful. Chameleon Invoice Builder changes that: an AI-powered web app that makes invoicing effortless and intuitive, so you can focus on your business, not your paperwork.

The power of AI is realized when you break out of a chat box and showcase how it impacts your productivity and business. This is the essence of Chameleon Invoice. Invoicing made simple. Done before you notice.

## Demo

**Live Demo:**  
[https://chameleon-invoice-web.vercel.app/](https://chameleon-invoice-web.vercel.app/)

**Video Presentation:**  
[https://www.youtube.com/watch?v=Q3AWXcudeIo](https://www.youtube.com/watch?v=Q3AWXcudeIo)

## Features

- **AI-Driven Simplicity:** Generate invoices quickly with minimal input.
- **Business Info Autofill:** Instantly pull business addresses from the web with a single URL.
- **Seamless Email Delivery:** Send invoices directly to your clients (in progress).
- **Smart Suggestions:** Auto-complete fields and learn from your usage patterns.
- **Customizable Templates:** Create professional invoices you can personalize.
- **Customer Management:** Save and reuse customer information.
- **Real-time Preview:** Instantly see your invoice update as AI assists you with every change.

## Technology Stack

- **Frontend:** Next.js, TypeScript, Shadcn UI
- **AI Integration:**
  - **[Mastra](https://mastra.ai/):** AI agents, memory, workflows
  - **Copilot Kit:** Advanced AI-driven UI/UX using AG-UI
- **External Integrations:**
  - **MCP (Model Context Protocol):** Connects to Exa (web search) and Resend (email delivery)
- **Hosting:**
  - **Vercel:** Web App Hosting
  - **[Mastra Cloud](https://cloud.mastra.ai/):** Cloud Agent hosting

## Upcoming Features

- Business info autofill (Exa MCP)
- Email delivery (Resend MCP)

## Roadmap

- CSV import/export
- Download invoices as PDF, DOC
- Payment processor integration (Stripe)
- Invoice tracking and reminders
- Expense tracking and reporting
- Voice integration
- Additional Mastra features & integration when state sharing and workflow enforcement can be applied

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chameleon-invoice.git
   cd chameleon-invoice/ai-invoice-builder
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm run dev
   ```

4. **Start Mastra in a separate terminal:**

   ```bash
   pnpm run mastra
   ```

5. **Open your browser:**
   Go to [http://localhost:3000](http://localhost:3000)

## Contributors

- Chris Moffett - Business owner, user testing
- Kirkwood Donavan -  Data analyst, user testing
- Kevin Traver - Back-end dev
- Branden Silva - Front-end dev

---
