/**
 * lib/projects.ts
 *
 * Strongly typed project database representing real case studies.
 * Contains technical breakdowns, solution architectural details, and stack items.
 */

export interface Project {
  id: string
  title: string
  category: string
  description: string
  challenge: string
  solution: string
  highlights: string[]
  techStack: string[]
  image: string
  demo: string
  github: string
}

export const projects: Project[] = [
  {
    id: 'nova-interiors',
    title: 'NOVA Interiors',
    category: 'Luxury Design Studio & CMS Admin',
    description: 'A premium portfolio and client acquisition platform for a high-end interior design studio, featuring a secured administration panel, Server Actions, and a public Supabase media bucket.',
    challenge: 'Establishing a robust server-side data layer with Supabase RLS and checkIsAdmin() role verification, combined with a zero-config fallback strategy that gracefully serves mock datasets if environment keys are missing during builds.',
    solution: 'Engineered Server Actions with database fallbacks. Secured content tables in Supabase using Row-Level Security (RLS) policies and admin lookup checks. Created a high-fidelity dark editorial interface with Tailwind CSS v4, GSAP/Framer Motion animations, and Lenis smooth scrolling.',
    highlights: [
      'Designed a relational Supabase schema with RLS policies enabled across all content management tables (projects, services, journal, inquiries).',
      'Implemented a zero-config database fallback strategy to load comprehensive offline mock datasets if environment keys are omitted.',
      'Created a luxurious dark editorial UI utilizing Lenis smooth scrolling, GSAP ScrollTriggers, and Framer Motion transitions.'
    ],
    techStack: ['Next.js 16.2', 'TypeScript 5', 'Supabase', 'Tailwind CSS v4', 'GSAP', 'Framer Motion', 'Lenis', 'React Hook Form', 'Zod'],
    image: '/images/projects/ChatGPT Image Aug 5, 2026, 06_54_54 PM.png',
    demo: 'https://nova-interiors-bay.vercel.app',
    github: 'https://github.com/arshal-salu/nova-interiors'
  },
  {
    id: 'nuxt-school-manager',
    title: 'Nuxt School Manager',
    category: 'Centralized School Management Platform',
    description: 'A comprehensive administrative dashboard built with Nuxt 4 and Supabase for managing student rosters, roll numbers, teacher mappings, academic grades, and bulk attendance tracking.',
    challenge: 'Coordinating complex relational structures (divisions, teachers, subjects, attendance, grades) under Nuxt 4\'s app/ directory structure, implementing passwordless Email OTP authentication with global middleware guards, and handling student avatar uploads to Supabase storage buckets.',
    solution: 'Designed a responsive dashboard using Nuxt 4 and Tailwind CSS. Implemented email OTP verification flows and global routing middleware. Configured a secure PostgreSQL engine on Supabase for relational queries, automated roll number assignments (R-YYYY-XXXX), and integrated bulk logging for class attendance and exam grades.',
    highlights: [
      'Built a multi-portal system utilizing Nuxt 4\'s new app directory structure and global navigation middleware controls.',
      'Designed a relational PostgreSQL schema on Supabase featuring automated cascading deletes for student profiles and grades.',
      'Developed a bulk log system for academic rosters (Present, Absent, Late) and printable student 360 performance report cards.'
    ],
    techStack: ['Nuxt 4', 'Vue 3', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Email OTP'],
    image: '/images/projects/ChatGPT Image Jul 18, 2026, 07_07_02 AM.png',
    demo: 'https://nuxt-app-plum-tau.vercel.app',
    github: 'https://github.com/arshal-salu/nuxt-school-manager'
  },
  {
    id: 'bitego',
    title: 'BiteGo',
    category: 'Modern Food Ordering Platform',
    description: 'A fast, client-centric food delivery and merchant portal powered by Nuxt 3, Pinia, and Prisma. Supports dynamic cart operations, Razorpay payment processing, and email OTP verification.',
    challenge: 'Coordinating low-latency cart states via Pinia with a complex PostgreSQL relational schema (Users, Stores, Orders, Reviews) managed by Prisma, while implementing custom password hashing, JWT authorization, and email OTP dispatching via Nodemailer.',
    solution: 'Built serverless Nitro API routes for stores and products. Integrated Pinia stores for reactive shopping cart state. Implemented Bcrypt/JWT authentication with Zod input validation, Nodemailer email OTP dispatchers, and integrated Razorpay payment webhooks.',
    highlights: [
      'Structured a relational PostgreSQL database utilizing Prisma ORM with custom seeding and migration setups.',
      'Developed a custom verification pipeline sending OTP verification codes via Nodemailer.',
      'Integrated Razorpay checkout client SDKs coupled with secure serverless webhooks for instant order confirmation.'
    ],
    techStack: ['Nuxt 3', 'Pinia', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Razorpay', 'Zod'],
    image: '/images/projects/bitego_gallery_1.png',
    demo: 'https://bitego-in.vercel.app',
    github: 'https://github.com/arshal-salu/bitego'
  },
  {
    id: 'ecrola-engineering',
    title: 'Ecrola Engineering',
    category: 'Corporate Engineering Website',
    description: 'A dynamic corporate web application for a precision engineering firm, integrating a Next.js App Router frontend with a Supabase PostgreSQL backend database.',
    challenge: 'Migrating a legacy static web template into a modular Next.js 16.2 App Router model, designing PostgreSQL tables (products, gallery, contacts) on Supabase with strict Row Level Security (RLS) policies, and implementing touch-enabled Swiper sliders and WhatsApp support triggers.',
    solution: 'Built Server Components and pages under ecrola-next/app/ styled with TailwindCSS v4. Integrated Supabase client connections for fetching catalog products and galleries. Implemented appointment inquiry contact forms with secure database mutation hooks and Framer Motion animation reveals.',
    highlights: [
      'Architected a Next.js App Router website featuring responsive routing paths for about, contact, galleries, and product catalogs.',
      'Designed and seeded a relational Supabase database with RLS policies enabled across all tables for secure public query execution.',
      'Developed custom image sliders utilizing Swiper slide-galleries combined with micro-interactions powered by Framer Motion.'
    ],
    techStack: ['Next.js 16.2', 'React 19', 'TypeScript 5', 'TailwindCSS v4', 'Framer Motion', 'Supabase', 'Swiper', 'Lucide React'],
    image: '/images/projects/ChatGPT Image Jul 24, 2026, 05_37_04 AM.png',
    demo: 'https://ecrola-engineering.vercel.app',
    github: 'https://github.com/arshal-salu/ecrola-engineering'
  }
]
