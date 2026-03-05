# Korami Site (KOTA by Kummalabs)

## 1. Project Overview
This project is the frontend landing page for **KOTA by Kummalabs**, a service that provides an AI voice agent designed to handle restaurant phone orders and reservations. The application serves as a marketing and lead-generation tool, showcasing the product's value proposition, features, and use cases, while allowing potential clients to request a demo.

## 2. Tech Stack
The application is built using a modern, performance-focused web stack:
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/) (Release Candidate)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with utilities like `clsx` and `tailwind-merge`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email Delivery:** [Resend](https://resend.com/) API

## 3. Setup Instructions

To get the project running locally, follow these steps:

### Prerequisites
Make sure you have Node.js (v18+ recommended) installed.

### Installation
Clone the repository and install dependencies using your preferred package manager (npm, pnpm, or yarn):

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install
```

### Development Server
Start the development server:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 4. Project Structure

The project follows a standard Next.js App Router architecture within the `src/` directory:

- **`src/app/`**: Contains the core routing and layouts.
  - `layout.tsx`: Root layout with global fonts and styles.
  - `page.tsx`: The main landing page assembling various sections.
  - `api/contact/route.ts`: API route for handling contact form submissions via Resend.
- **`src/components/`**: Highly modular UI components forming the landing page.
  - Core sections: `Hero.tsx`, `ProblemOutcome.tsx`, `HowItWorks.tsx`, `UseCases.tsx`, `SafetyHandoff.tsx`.
  - Global elements: `Header.tsx`, `Footer.tsx`.
  - Interactive elements: `ContactForm.tsx`, `CTA.tsx`.

## 5. Key Features

Based on the codebase review, the key features include:
- **Modular Component Design:** The landing page is broken down into distinct, maintainable React components.
- **Responsive Styling:** Fully responsive design using Tailwind CSS utility classes.
- **Contact Form Integration:** A functional lead-generation form that sends emails directly to the team using the Resend API.
- **Clear Value Proposition Display:** Sections dedicated to explaining the "Answer -> Confirm -> Deliver" flow and safety handoffs (human fallback).

## 6. Environment Variables

To run the contact form and email features locally, you need to configure the following environment variables. Create a `.env.local` file in the root directory (you can use `env.local.example` as a template):

```env
# Required: Your Resend API key for sending emails
RESEND_API_KEY=your_resend_api_key_here

# Optional: The email address where demo requests/notifications should be sent
NOTIFICATION_EMAIL=your_notification_email@example.com
```

## 7. Future Improvements

To enhance the project's scalability, maintainability, and user experience, consider the following improvements:
- **Testing Integration:** Implement unit testing (e.g., Jest, React Testing Library) for UI components and E2E testing (e.g., Playwright, Cypress) for critical user flows like the contact form.
- **Externalizing Content:** Integrate a Headless CMS (like Sanity, Contentful, or Strapi) to manage marketing copy without requiring code deployments.
- **Analytics & Tracking:** Add Google Analytics, PostHog, or Vercel Web Analytics to track user engagement and form conversions.
- **Internationalization (i18n):** If expanding to non-English speaking markets, implement Next.js internationalized routing.
- **CI/CD Pipeline:** Set up automated linting, type-checking, and testing via GitHub Actions before deployment.
