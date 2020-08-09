/* eslint-disable */
const theme = {
  color: {
    dark: 'rgba(0, 0, 0, 0.87)',
    primary: '#5677fc',
    primaryDark: '#455ede',
    secondary: '#ff5177',
    grey: '#EEEEEE',
    greyLight: '#f6f5f7',
    white: '#FFFFFF'
  },
  transition: {
    base: (options) => {
      return (`
        ${options.el} ${options.speed || '0.2'}s cubic-bezier(0.4, 0.0, 0.2, 1)
      `)
    }
  }
}

export { theme };
