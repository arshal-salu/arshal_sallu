import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Turbopack the root is this project directory, not the parent.
    // This silences the 'multiple lockfiles' workspace warning.
    root: path.resolve(__dirname),
  },
}

export default nextConfig
