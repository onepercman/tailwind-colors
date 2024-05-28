import { TailwindColorsConfig } from '@types'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import plugin from 'tailwindcss/plugin'
import { RecursiveKeyValuePair } from 'tailwindcss/types/config'

function isHexColor(color: string): boolean {
  const hexColorRegex = RegExp(/^#([0-9a-f]{3}){1,2}$/i)
  return hexColorRegex.test(color)
}

function isRGBColor(color: string): boolean {
  const rgbStringRegex = RegExp(
    /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/
  )
  return rgbStringRegex.test(color)
}

function canOpacitize(color: string): boolean {
  return isHexColor(color) || isRGBColor(color)
}

function getRGB(color: string): string {
  if (isHexColor(color)) {
    const getRgbRegex = RegExp(/^#?([a-f\d])([a-f\d])([a-f\d])$/i)
    const rgb = color.replace(getRgbRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
    })
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb) as any
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r}, ${g}, ${b}`
  }
  if (isRGBColor(color)) {
    return color.substring(4, color.length - 1)
  }
  return color
}

function withOpacity(variableName: string, prefix: string) {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(--${prefix}-${variableName}), ${opacityValue})`
    return `rgb(var(--${prefix}-${variableName}))`
  }
}

function getSelectorKey(selector: TailwindColorsConfig['selector'], scheme: string): string {
  if (selector === 'class') {
    return `.${scheme}`
  }
  return `[${selector}="${scheme}"]`
}

function getBaseVariables(colors: object, prefix: string) {
  const flatten = flattenColorPalette(colors)
  return Object.fromEntries(
    Object.entries(flatten).map(([key]) => [`--${prefix}-${key}`, getRGB(flatten[key])])
  )
}

function getColorEntries(colors: object, prefix: string) {
  const flatten = flattenColorPalette(colors)

  return Object.fromEntries(
    Object.entries(flatten).map(([key, value]) => [
      key,
      canOpacitize(flatten[key]) ? withOpacity(key, prefix) : value,
    ])
  ) as RecursiveKeyValuePair<string, string>
}

export const schemes = plugin.withOptions<TailwindColorsConfig>(
  ({ schemes, selector = 'data-theme', prefix = 'tw-schemes' }) => {
    return ({ addBase }) => {
      Object.keys(schemes).forEach((theme) => {
        const selectorKey = getSelectorKey(selector, theme)
        const base = getBaseVariables(schemes[theme], prefix)
        addBase({
          [selectorKey]: base,
        })
      })
    }
  },
  ({ schemes, prefix = 'tw-schemes' }) => {
    let colors = {}
    Object.keys(schemes).forEach((scheme) => {
      const schemeColors = getColorEntries(schemes[scheme], prefix)

      colors = {
        ...colors,
        ...schemeColors,
      }
    })
    return {
      theme: {
        extend: {
          colors,
        },
      },
    }
  }
)
