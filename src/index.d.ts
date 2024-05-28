import plugin from 'tailwindcss/plugin.js'
import { Color, Scheme, TailwindColorsConfig } from './types'

declare const schemes: (config?: TailwindColorsConfig) => ReturnType<typeof plugin>
declare const colorize: <C extends Color>(color: C, key?: keyof C) => Color
declare const shades: (baseColor: string) => Color

export type { Color, Scheme, TailwindColorsConfig }

export { schemes, colorize, shades }
