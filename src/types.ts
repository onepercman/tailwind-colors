type Color =
  | Partial<{
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
      DEFAULT: string
      foreground: string
      [key: string]: string
    }>
  | string

type Scheme = Record<string, Color>

type TailwindColorsConfig = {
  selector?: 'class' | string
  prefix?: string
  global?: Scheme
  schemes: Record<string, Scheme>
}

type ResetProperty = string | string[] | object

type ResetOptions = Partial<{
  html: ResetProperty
  body: ResetProperty
  [key: string]: ResetProperty
}>

export type { Color, Scheme, TailwindColorsConfig, ResetOptions }
