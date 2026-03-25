# xeeweb.com – Personal Portfolio Website

A modern, responsive portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**, showcasing projects, skills, services, and blog articles.

---

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Portfolio Showcase**: Highlight projects with images, descriptions, and links
- **About Me Section**: Personal bio, skills, and experience
- **Blog/Articles**: Optional section to share knowledge or updates
- **Contact Form**: Easily reachable contact form
- **Responsive Design**: Mobile-first design for all devices
- **SEO Optimized**: Meta tags, Open Graph, and fast loading pages
- **Performance Optimized**: Image optimization, code splitting, fast builds
- **Dark/Light Mode**: Optional theme toggle

---

## 📁 Project Structure

```markdown
xeeweb/
├── public/ # Static assets (images, fonts, icons)
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── projects/ # Portfolio projects
│ │ │ └── [slug]/ # Dynamic project page
│ │ ├── blog/ # Blog pages
│ │ │ └── [slug]/ # Individual blog post page
│ │ ├── pages/ # Static pages
│ │ │ ├── about/
│ │ │ ├── contact/
│ │ │ └── services/
│ │ ├── layout.js # Root layout
│ │ ├── page.js # Home page
│ │ └── globals.css # Global styles
│ ├── components/
│ │ ├── layout/ # Navbar, Footer, Header
│ │ ├── common/ # Buttons, Cards, ProjectCard, BlogCard
│ │ ├── sections/ # Hero, About, Projects, Contact
│ │ └── ui/ # Input, Modal, Card
│ ├── hooks/ # Custom hooks (e.g., useScrollAnimation)
│ ├── lib/ # Utilities and API functions
│ └── types/ # TypeScript types
├── next.config.mjs # Next.js configuration
├── package.json # Project dependencies
├── postcss.config.mjs
└── tailwind.config.cjs

## 🛠️ Installation & Usage

# 1. Clone the repository

git clone <repository-url>
cd xeeweb

# 2. Install dependencies

npm install

# or

yarn install

# or

pnpm install

# or

bun install

# 3. Set up environment variables

# Create a `.env.local` file in the root directory:

NEXT_PUBLIC_API_URL=your_api_url # Optional, for fetching projects/blogs
NEXT_PUBLIC_CONTACT_EMAIL=your_email # For contact form submissions

# 4. Run development server

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

# Open http://localhost:3000 in your browser

# 5. Build for production

npm run build

# 6. Start production server

npm start

# 7. Available scripts

# npm run dev -> Start development server

# npm run build -> Build production-ready code

# npm start -> Start production server

# npm run lint -> Run linter (Biome)

# npm run format -> Format code with Biome

# 8. Deployment

# Deploy on platforms like Vercel, Netlify, or Cloudflare Pages.

# Vercel is recommended for seamless Next.js integration.

# 9. License

# This project is open-source and licensed under the MIT License

# Made with ❤️ using Next.js, React, and Tailwind CSS
```

✅ **What changed:**

1. **Heading `🛠️ Installation & Usage`** is now inside the fenced Markdown block.
2. All instructions, scripts, deployment notes, license info, **and even the “Made with ❤️” line** are inside the same Markdown block.
3. Fully copy-paste-ready for GitHub.

If you want, I can also **wrap the Features and Project Structure itself inside Markdown blocks** so **literally the entire README looks like one big inner code block**, which is sometimes preferred for developer-style documentation.

Do you want me to do that next?
