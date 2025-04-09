# Multi-Step Form with Validation

![Project Screenshot](./public/screenshot.png) <!-- Add your screenshot here -->

A modern, responsive multi-step form with comprehensive validation built using Next.js, TypeScript, React Hook Form, and Tailwind CSS.

## ✨ Features

- **Multi-step workflow** with progress indicator
- **Client-side validation** using Zod schema validation
- **Beautiful UI** with dark/light mode support
- **Responsive design** works on all devices
- **Form persistence** between steps
- **Summary review** before submission
- **API simulation** with React Query

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **State Management**: React Query
- **UI Components**: Custom design system

## 📦 Folder Structure

```
multi-step-form/
├── app/
│   ├── form/                 # Form route group
│   │   ├── components/       # Form step components
│   │   ├── form-schema.ts    # Zod validation schema
│   │   └── page.tsx          # Main form logic
├── components/
│   ├── ui/                   # UI primitives
│   └── ThemeToggle.tsx       # Dark mode toggle
├── lib/                      # Utilities and providers
├── styles/                   # Global styles
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/multi-step-form.git
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔍 Validation Rules

| Step | Field            | Validation              |
| ---- | ---------------- | ----------------------- |
| 1    | Full Name        | Required                |
| 1    | Email            | Required, valid format  |
| 1    | Phone            | Required, min 10 digits |
| 2    | Street Address   | Required                |
| 2    | City             | Required                |
| 2    | Zip Code         | Required, numbers only  |
| 3    | Username         | Required, min 4 chars   |
| 3    | Password         | Required, min 6 chars   |
| 3    | Confirm Password | Must match password     |

## 📝 Code Highlights

```typescript
// Form schema validation
export const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  // ... other schemas
});
```

## ✉️ Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - youremail@example.com

Project Link: [https://github.com/your-username/multi-step-form](https://github.com/your-username/multi-step-form)
