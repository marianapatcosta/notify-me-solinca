import common from './common'

export type ThemeType = typeof dark

export const dark = {
  colors: {
    ...common.colors,
    primary: '#141414',
    secondary: '#1f1f1f',
    font: '#ffffff',
    shadow: '#000000',
  },
  fonts: {
    ...common.fonts,
  },
}

