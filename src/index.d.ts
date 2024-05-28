import plugin from 'tailwindcss/plugin.js'
import { Color, Scheme, TailwindColorsConfig } from './types'

declare const colors: (config?: TailwindColorsConfig) => ReturnType<typeof plugin>

export type { Color, Scheme, TailwindColorsConfig }

export { colors }
