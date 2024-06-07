import { Color } from '@types'

export function colorize<C extends Color>(
  color: C,
  defaultKey: keyof C = 500,
  foregroundKey: keyof C = 950
) {
  if (typeof color !== 'object') return color
  const c = { ...color }
  if (defaultKey in c && !c.DEFAULT) {
    c.DEFAULT = c[defaultKey] as string
  }
  if (foregroundKey in c && !c.foreground) {
    c.foreground = c[foregroundKey] as string
  }
  return c
}

function parseColor(color: string) {
  if (typeof color !== 'string') {
    throw new TypeError('Color should be string!')
  }
  const hexMatch = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color)
  if (hexMatch) {
    return hexMatch.splice(1).map((c) => Number.parseInt(c, 16))
  }
  const hexMatchShort = /^#?([\da-f])([\da-f])([\da-f])$/i.exec(color)
  if (hexMatchShort) {
    return hexMatchShort.splice(1).map((c) => Number.parseInt(c + c, 16))
  }
  if (color.includes(',')) {
    return color.split(',').map((p) => Number.parseInt(p))
  }
  throw new Error('Invalid color format!')
}

function hexValue(components) {
  return '#' + components.map((c) => `0${c.toString(16).toUpperCase()}`.slice(-2)).join('')
}
function tint(components, intensity) {
  return components.map((c) => Math.round(c + (255 - c) * intensity))
}
function shade(components, intensity) {
  return components.map((c) => Math.round(c * intensity))
}
const withTint = (intensity) => (hex) => tint(hex, intensity)
const withShade = (intensity) => (hex) => shade(hex, intensity)

const _variants = {
  50: withTint(0.95),
  100: withTint(0.9),
  200: withTint(0.75),
  300: withTint(0.6),
  400: withTint(0.3),
  500: (c) => c,
  600: withShade(0.9),
  700: withShade(0.6),
  800: withShade(0.45),
  900: withShade(0.3),
  950: withShade(0.2),
}

export function shades(color: string): Color {
  const colors = {}
  const components = parseColor(color)
  for (const [name, fn] of Object.entries(_variants)) {
    colors[name] = hexValue(fn(components))
  }
  return colors
}
