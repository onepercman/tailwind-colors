import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import plugin from "tailwindcss/plugin"
import { RecursiveKeyValuePair } from "tailwindcss/types/config"

export interface ColorConfig {
  DEFAULT: string
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface DynamicColorConfig {
  [key: string | number]: Partial<ColorConfig> | DynamicColorConfig | Record<any, string> | string
}

const isHexColor = (color: string): boolean => {
  const hexColorRegex = RegExp(/^#([0-9a-f]{3}){1,2}$/i)
  return hexColorRegex.test(color)
}

const isRGBColor = (color: string): boolean => {
  const rgbStringRegex = RegExp(
    /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/,
  )
  return rgbStringRegex.test(color)
}

const canOpacitize = (color: string): boolean => {
  return isHexColor(color) || isRGBColor(color)
}

const getRGB = (color: string): string => {
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

const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(--${variableName}), ${opacityValue})`
    return `rgb(var(--${variableName}))`
  }
}

export default plugin.withOptions<Record<string, DynamicColorConfig>>(
  (themes) => {
    return ({ addBase }) => {
      Object.keys(themes).forEach((theme) => {
        const selector = String(themes[theme]["selector"] || `[data-theme="${theme}"]`)
        const flatten = flattenColorPalette(themes[theme])
        const base = Object.fromEntries(Object.entries(flatten).map(([key]) => [`--${key}`, getRGB(flatten[key])]))
        addBase({
          [selector]: base,
        })
      })
    }
  },
  (themes) => {
    let colors = {}
    Object.keys(themes).forEach((theme) => {
      const flatten = flattenColorPalette(themes[theme])
      const themeColors = Object.fromEntries(
        Object.entries(flatten).map(([key, value]) => [key, canOpacitize(flatten[key]) ? withOpacity(key) : value]),
      ) as RecursiveKeyValuePair<string, string>
      colors = {
        ...colors,
        ...themeColors,
      }
    })
    return {
      theme: {
        extend: {
          colors,
        },
      },
    }
  },
)
