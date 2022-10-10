import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    font: {
      family: string
      regular: number
      semi_bold: number
      bold: number
      extra_bold: number
    }
    colors: {
      primary: string
      white: string
      black: string
      neutral: string
      gray: string
      background: string
      danger: string
      gray: string
    }
    sizes: {
      smallest: string
      small: string
      medium: string
      large: string
      xlarge: string
      xxlarge: string
    }
  }
}
