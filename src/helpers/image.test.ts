import Handlebars from 'handlebars'
import trianglify from 'trianglify'
import './image'

const toSvg = jest.fn(() => 'svg_image')

jest.mock('trianglify', () => {
  return jest.fn(() => {
    return {
      toSVGTree: toSvg
    }
  })
})

test('imageURL', () => {
  const result = Handlebars.compile(`{{imageURL "boy"}}`)({})
  expect(result).toMatchInlineSnapshot(
    `"url(&quot;data:image/svg+xml;base64,c3ZnX2ltYWdl&quot;)"`
  )
  expect(trianglify).toHaveBeenLastCalledWith({
    cellSize: 125,
    height: 800,
    seed: 'boy',
    width: 1200,
    yColors: 'match'
  })
})

test('imageURI', () => {
  const result = Handlebars.compile(`{{imageURI "man"}}`)({})
  expect(result).toMatchInlineSnapshot(
    `"data:image/svg+xml;base64,c3ZnX2ltYWdl"`
  )
  expect(trianglify).toHaveBeenLastCalledWith({
    cellSize: 125,
    height: 800,
    seed: 'man',
    width: 1200,
    yColors: 'match'
  })
})
