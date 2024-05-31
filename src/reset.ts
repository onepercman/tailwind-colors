import { ResetOptions } from '@types'
import plugin from 'tailwindcss/plugin'

export const resetCSS = plugin.withOptions<ResetOptions>((options = {}) => {
  return ({ addBase }) => {
    Object.keys(options).forEach(function (option) {
      const value = options[option]
      if (Array.isArray(value)) {
        return addBase({
          [option]: {
            [`@apply ${value.join(' ')}`]: {},
          },
        })
      }
      if (typeof value === 'string') {
        return addBase({
          [option]: {
            [`@apply ${value}`]: {},
          },
        })
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        return addBase({
          [option]: {
            [`@apply ${value}`]: {},
          },
        })
      }
    })
  }
})
