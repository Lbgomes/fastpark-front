import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  borderRadius: '0.8rem',
  font: {
    family: "'Nunito Sans', sans-serif",
    regular: 400,
    semi_bold: 600,
    bold: 700,
    extra_bold: 800
  },
  colors: {
    primary: '#E4672E',
    white: '#FFFFFF',
    black: '#101010',
    gray: 'rgba(255, 255, 255, 0.4)',
    neutral: '#EBEBEB',
    background: '#1C1C1C',
    danger: '#F5365C'
  },
  sizes: {
    smallest: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '1.8rem',
    xlarge: '2.6rem',
    xxlarge: '3.2rem'
  }
}

export default theme
