export interface SocialLink {
  name: string
  url: string
  label: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/arshalv',
    label: 'Visit GitHub profile'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/arshalv',
    label: 'Follow on Instagram'
  },
  {
    name: 'X',
    url: 'https://x.com/arshalv',
    label: 'Follow on X'
  },
  {
    name: 'Email',
    url: 'mailto:hello@arshalv.dev',
    label: 'Send an email'
  }
]
