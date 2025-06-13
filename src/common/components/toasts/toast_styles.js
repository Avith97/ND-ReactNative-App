const { StyleSheet } = require('react-native')
const { default: Fonts, fontSize } = require('../../../utils/constants/Fonts')

export const toast_styles = StyleSheet.create({
  header: {
    fontFamily: Fonts.Medium,
    fontSize: fontSize.s
  },
  info: {
    fontFamily: Fonts.Regular,
    fontSize: fontSize.s
  }
})
