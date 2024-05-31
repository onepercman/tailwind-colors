import plugin from 'tailwindcss/plugin.js'
import { Color, ResetOptions, Scheme, TailwindColorsConfig } from './types'

declare const schemes: (config?: TailwindColorsConfig) => ReturnType<typeof plugin>
declare const colorize: <C extends Color>(color: C, key?: keyof C) => Color
declare const shades: (baseColor: string) => Color
declare const reset: (options: ResetOptions) => ReturnType<typeof plugin>

export type { Color, Scheme, TailwindColorsConfig, ResetOptions }

export { schemes, colorize, shades, reset }
