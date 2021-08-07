import common from './common'

export type ThemeType = typeof light

export const light = {
  colors: {
    ...common.colors,
    primary: '#ffffff',
    secondary: '#f4f4f4',
    font: '#555555',
    shadow: '#efefef',
  },
  fonts: {
    ...common.fonts,
  },
}

