export interface Principle {
  number: string
  title: string
  description: string
}

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Think in Systems',
    description: 'I design software as connected systems instead of isolated features, making applications easier to maintain, extend, and scale.'
  },
  {
    number: '02',
    title: 'Build with Purpose',
    description: 'Every feature should solve a real problem. I value thoughtful decisions and meaningful user experiences over unnecessary complexity.'
  },
  {
    number: '03',
    title: 'Performance Matters',
    description: 'Fast, accessible, and responsive software creates better experiences. Performance is treated as a core feature, not an afterthought.'
  },
  {
    number: '04',
    title: 'Keep Learning',
    description: 'Technology evolves constantly. I continuously explore AI, modern frameworks, and software architecture through experimentation and personal projects.'
  }
]
