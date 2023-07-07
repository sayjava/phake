import Handlebars from 'handlebars'
import GeoPattern from 'geopattern'

const DEFAULT_COLOR = '#933c3c'

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper('imageURL', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toDataUrl()
})

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper('imageURI', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toDataUri()
})

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper('imageSVG', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toSvg()
})

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper(
  'imageBase64',
  function (text: string, ...args: any[]) {
    const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
    return GeoPattern.generate(text, { baseColor }).toBase64()
  }
)
