import Handlebars from 'handlebars'
import trianglify from 'trianglify'

const generateSVG = ({ seed }: { seed: string }): string => {
  const svg = trianglify({
    width: 1200,
    height: 800,
    cellSize: 125,
    seed,
    yColors: 'match'
  }).toSVGTree().toString()

  return Buffer.from(svg).toString('base64')
}

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper('imageURL', function (text: string, ...args: any[]) {
  return `url("data:image/svg+xml;base64,${generateSVG({ seed: text })}")`
})

/**
 * Generate a pattern image from a string.
 */
Handlebars.registerHelper('imageURI', function (text: string, ...args: any[]) {
  return `data:image/svg+xml;base64,${generateSVG({ seed: text })}`
})
