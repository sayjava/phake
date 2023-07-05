import Handlebars from 'handlebars'
import Geopattern from 'geopattern'
import './image'

const toDataUrl = jest.fn(() => 'url_image')
const toDataUri = jest.fn(() => 'uri_image')
const toSvg = jest.fn(() => 'svg_image')
const toBase64 = jest.fn(() => 'base64_image')

jest.mock('geopattern', () => {
  return {
    generate: jest.fn(() => {
      return {
        toDataUrl,
        toDataUri,
        toSvg,
        toBase64
      }
    })
  }
})

test('imageURL', () => {
  const result = Handlebars.compile(`{{imageURL "boy"}}`)({})
  expect(result).toMatchInlineSnapshot(`"url_image"`)
  expect(Geopattern.generate).toHaveBeenLastCalledWith('boy', {
    baseColor: '#933c3c'
  })
})

test('imageURL custom color', () => {
  const result = Handlebars.compile(`{{imageURL "boy" "#00000"}}`)({})
  expect(result).toMatchInlineSnapshot(`"url_image"`)
  expect(Geopattern.generate).toHaveBeenLastCalledWith('boy', {
    baseColor: '#00000'
  })
})

test('imageURI', () => {
  const result = Handlebars.compile(`{{imageURI "girl"}}`)({})
  expect(result).toMatchInlineSnapshot(`"uri_image"`)
  expect(Geopattern.generate).toHaveBeenLastCalledWith('girl', {
    baseColor: '#933c3c'
  })
})

test('imageSVG', () => {
  const result = Handlebars.compile(`{{imageSVG "man"}}`)({})
  expect(result).toMatchInlineSnapshot(`"svg_image"`)
  expect(Geopattern.generate).toHaveBeenLastCalledWith('man', {
    baseColor: '#933c3c'
  })
})

test('imageBase64', () => {
  const result = Handlebars.compile(`{{imageBase64 "woman"}}`)({})
  expect(result).toMatchInlineSnapshot(`"base64_image"`)
  expect(Geopattern.generate).toHaveBeenLastCalledWith('woman', {
    baseColor: '#933c3c'
  })
})
