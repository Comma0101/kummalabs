# Codebase Analysis Summary

## 1. Architecture Overview
The project is a modern web application built using the following core technologies:
- **Framework:** Next.js (v15.0.3) utilizing the App Router paradigm (`src/app/` directory).
- **Language:** TypeScript, ensuring type safety across components and configurations.
- **Styling:** Tailwind CSS integrated via PostCSS, with utility functions like `clsx` and `tailwind-merge` for dynamic class manipulation.
- **UI Library:** React (v19.0.0-rc) and React DOM.

The application serves as a landing page for **KOTA by Kummalabs**, a service that provides an AI voice agent to handle restaurant phone orders and reservations.

## 2. Project Structure & Components
The application follows a standard Next.js App Router structure with a dedicated `src/` directory.

### Core Layout (`src/app/`)
- `layout.tsx`: The root layout that includes the `Inter` font setup (via `next/font/google`), global styling (`globals.css`), and wraps the main content with global `Header` and `Footer` components.
- `page.tsx`: The main landing page assembling various sections sequentially.
- `globals.css`: Contains global Tailwind CSS imports and custom base styles.

### UI Components (`src/components/`)
The landing page is highly modular, broken down into specific feature components:
- `Header` & `Footer`: Global navigation and footer elements.
- `Hero.tsx`: The top section with the main value proposition ("Answer every call. Capture every order.") and a call-to-action button linking to the contact form.
- `ProblemOutcome.tsx`: Likely details the pain points of busy restaurants and the benefits KOTA brings.
- `HowItWorks.tsx`: A 3-step explanatory section detailing the user flow (Answer -> Confirm -> Deliver).
- `UseCases.tsx`: Highlights specific scenarios where the product excels.
- `SafetyHandoff.tsx`: Explains the fallback mechanism (handing off to staff when the AI is unsure).
- `CTA.tsx`: A secondary call-to-action section.
- `ContactForm.tsx`: A form at the bottom of the page for requesting a demo, likely integrated with Resend for email delivery.

## 3. Dependencies

### Core Dependencies
- `next` (15.0.3): The React framework powering the application.
- `react` & `react-dom` (19.0.0-rc): The underlying UI libraries.
- `resend` (^6.4.2): An email API client, used for processing the `ContactForm` submissions.
- `lucide-react` (^0.554.0): Icon library for UI elements.
- `clsx` (^2.1.1) & `tailwind-merge` (^3.4.0): Utilities for constructing and merging Tailwind CSS class names conditionally.

### Development Dependencies
- `typescript` (^5), `@types/node`, `@types/react`, `@types/react-dom`: TypeScript support and type definitions.
- `tailwindcss` (^3.4.1) & `postcss` (^8): The styling engine and its processor.
- `eslint` (^8) & `eslint-config-next` (15.0.3): Linting setup to maintain code quality.

## 4. Business Logic & Integrations
The site acts primarily as a marketing and lead-generation tool. The major functional piece of business logic is the contact form, which captures leads and utilizes the `resend` package to trigger emails (indicated by `CONTACT_FORM_SETUP.md` and `.env.local` files in the root). The product itself (KOTA) operates via phone forwarding and Cloud Printer/SMS delivery without requiring point-of-sale (POS) integration.