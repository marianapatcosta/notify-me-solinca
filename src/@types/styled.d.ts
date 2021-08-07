import 'styled-components'
import { ThemeType } from '../themes/dark'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
