import Handlebars from 'handlebars'
import GeoPattern from 'geopattern'

const DEFAULT_COLOR = '#933c3c'

Handlebars.registerHelper('imageURL', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toDataUrl()
})

Handlebars.registerHelper('imageURI', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toDataUri()
})

Handlebars.registerHelper('imageSVG', function (text: string, ...args: any[]) {
  const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
  return GeoPattern.generate(text, { baseColor }).toSvg()
})

Handlebars.registerHelper(
  'imageBase64',
  function (text: string, ...args: any[]) {
    const [, baseColor = DEFAULT_COLOR] = args.concat().reverse()
    return GeoPattern.generate(text, { baseColor }).toBase64()
  }
)
