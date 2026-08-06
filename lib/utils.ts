/**
 * lib/utils.ts
 *
 * Shared utility helpers used across all components.
 * `cn` is the single source of truth for class merging.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes with conflict resolution.
 * Accepts clsx-compatible inputs (strings, arrays, objects).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
