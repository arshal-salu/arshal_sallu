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
    category: 'Luxury Interior Design Studio Website',
    description: 'A premium portfolio and client acquisition platform for a high-end interior design studio. Engineered with focus on visual fidelity, micro-interactions, and content management.',
    challenge: 'High-end interior design studios rely on ultra-high-resolution imagery to convert clients. Rerendering large images without layout shift, maintaining smooth transitions, and providing a lightweight content management system were the primary technical hurdles.',
    solution: 'Built a headless architecture using Next.js and Sanity CMS. Leveraged Next.js Image Optimization API with custom LQIP (Low-Quality Image Placeholders) and layout constraints. Integrated custom Framer Motion page transitions to create a tactile, luxury user experience.',
    highlights: [
      'Implemented headless content orchestration with Sanity CMS, providing live-editing previews.',
      'Created custom scroll-driven web animations using Framer Motion with hardware acceleration.',
      'Achieved a near-perfect core web vitals score through aggressive static site generation (SSG).'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS'],
    image: '/images/projects/ChatGPT Image Aug 5, 2026, 06_54_54 PM.png',
    demo: 'https://nova-interiors-bay.vercel.app',
    github: 'https://github.com/arshalv/nova-interiors'
  },
  {
    id: 'nuxt-school-manager',
    title: 'Nuxt School Manager',
    category: 'Centralized School Management Platform',
    description: 'A comprehensive, multi-tenant administrative dashboard for managing student enrollment, academic reporting, staff schedules, and institutional payments.',
    challenge: 'Handling relational data streams (like grades, attendance logs, and fee payments) for hundreds of active concurrent sessions requires a robust, responsive interface and an optimized database schema that prevents lockups or excessive query times.',
    solution: 'Designed a modular dashboard system with Nuxt.js and Vue 3. Implemented a relational database schema using PostgreSQL and Prisma ORM. Integrated Supabase for authentication and real-time database subscription events, ensuring instantaneous sync across staff portals.',
    highlights: [
      'Designed a relational database schema using Prisma, featuring indexing for fast enrollment queries.',
      'Utilized Supabase real-time triggers to instantly push schedule changes to student devices.',
      'Engineered a secure multi-tenant role authorization system with custom middleware.'
    ],
    techStack: ['Nuxt.js', 'Vue 3', 'PostgreSQL', 'Prisma', 'Supabase'],
    image: '/images/projects/ChatGPT Image Jul 18, 2026, 07_07_02 AM.png',
    demo: 'https://nuxt-app-plum-tau.vercel.app',
    github: 'https://github/arshalv/nuxt-school-manager'
  },
  {
    id: 'bitego',
    title: 'BiteGo',
    category: 'Modern Food Ordering Platform',
    description: 'A fast, client-centric food ordering and checkout interface optimized for low-latency searches, cart operations, and local payment integration.',
    challenge: 'Food checkout platforms suffer high dropoff rates if checkout steps are slow or complex. Minimizing browser script execution time and coordinating fast payment updates were critical goals.',
    solution: 'Created a high-performance frontend using Vanilla JS and Tailwind CSS for minimal bundle size. Utilized Nitro as a modern, lightweight backend server, and structured a PostgreSQL database via Prisma. Integrated Razorpay API for immediate webhook-verified checkouts.',
    highlights: [
      'Developed a zero-dependency local state store in Vanilla JS for immediate UI responses.',
      'Configured Nitro server routes to achieve sub-100ms API responses for local food vendor listings.',
      'Integrated Razorpay checkout workflow with secure server-side webhook authentication.'
    ],
    techStack: ['Vanilla JS', 'Tailwind CSS', 'Nitro', 'Prisma', 'PostgreSQL', 'Razorpay'],
    image: '/images/projects/bitego_gallery_1.png',
    demo: 'https://bitego-in.vercel.app',
    github: 'https://github.com/arshalv/bitego'
  },
  {
    id: 'ecrola-engineering',
    title: 'Ecrola Engineering',
    category: 'Corporate Engineering Website',
    description: 'A high-performance corporate platform presenting industrial engineering projects, machinery catalogs, and technical service details.',
    challenge: 'Engineering catalogs feature complex CAD drawings and specifications that are difficult to present responsively. The client required a clean corporate design that displays complex diagrams legibly on all screens.',
    solution: 'Crafted a custom web app using Next.js and Tailwind CSS. Built custom responsive vector display widgets that render scale-independent blueprints. Leveraged Framer Motion to animate the breakdown of engineering assemblies.',
    highlights: [
      'Created interactive SVG blueprints that scale responsively across mobile and desktop displays.',
      'Configured dynamic segment-based static path generation for catalog items.',
      'Developed custom physics-based hover transitions for machinery catalog views.'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projects/ChatGPT Image Jul 24, 2026, 05_37_04 AM.png',
    demo: 'https://ecrola-engineering.vercel.app',
    github: 'https://github.com/arshalv/ecrola-engineering'
  }
]
