/**
 * lib/experiments.ts
 *
 * Database for ongoing AI Lab experiments, prototypes, and research vectors.
 */

export type ExperimentStatus = 'Building' | 'Prototype' | 'Research' | 'Planning'

export interface Experiment {
  id: string
  title: string
  description: string
  status: ExperimentStatus
  category: string
  technologies: string[]
  plannedFeatures: string[]
}

export const experiments: Experiment[] = [
  {
    id: 'document-intelligence',
    title: 'Document Intelligence',
    status: 'Building',
    category: 'LLM + OCR',
    description: 'Exploring AI-powered document understanding, structured schema extraction, and multi-page semantic search workflows.',
    technologies: ['OpenAI API', 'OCR Engine', 'Vector Search', 'Next.js'],
    plannedFeatures: ['Zero-shot key-value extraction', 'Context-aware PDF partitioning', 'Semantic table mapping']
  },
  {
    id: 'multi-agent-workflow',
    title: 'Multi-Agent Workflow',
    status: 'Research',
    category: 'AI Agents',
    description: 'Investigating collaborative AI agent systems capable of automated task planning, tool usage, and iterative validation loops.',
    technologies: ['LLMs', 'Tool Calling', 'Workflow Orchestration'],
    plannedFeatures: ['Hierarchical manager-worker routing', 'Stateful conversation memory', 'Human-in-the-loop validation triggers']
  },
  {
    id: 'rag-knowledge-assistant',
    title: 'RAG Knowledge Assistant',
    status: 'Prototype',
    category: 'Retrieval-Augmented Generation',
    description: 'Building a conversational assistant capable of context-aware answer retrieval from custom enterprise databases and files.',
    technologies: ['Embeddings', 'Vector Database', 'Next.js'],
    plannedFeatures: ['Hybrid dense-sparse retrieval', 'Re-ranking pipeline integration', 'Dynamic prompt window optimization']
  },
  {
    id: 'vision-ocr-pipeline',
    title: 'Vision OCR Pipeline',
    status: 'Planning',
    category: 'Computer Vision',
    description: 'Exploring vision-language pipelines for extracting nested data structures from raw camera photos and skewed document scans.',
    technologies: ['OCR', 'Image Processing', 'LLM'],
    plannedFeatures: ['Perspective correction algorithms', 'Layout-guided text parsing', 'Multi-modal schema normalization']
  }
]
