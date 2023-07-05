import Handlebars from 'handlebars'
import './faker'

jest.mock('@faker-js/faker', () => {
  return {
    en: [],
    Faker: jest.fn(() => {
      return {
        string: {
          alpha: () => 'string.alpha',
          word: (count) => `string.word ${count}`
        },
        commerce: {
          price: ({ min, max }) => `commerce.price min ${min} max ${max}`
        }
      }
    })
  }
})

test('faker', () => {
  const result = Handlebars.compile("{{faker 'string.alpha' 20}}")({})
  expect(expect).toMatchInlineSnapshot(`[Function]`)
})

test('hash parameter passed to faker function', () => {
  const result = Handlebars.compile("{{faker 'commerce.price' min=20 max=50}}")(
    {}
  )
  expect(result).toMatchInlineSnapshot(`"commerce.price min 20 max 50"`)
})

test('single parameter passed to faker function', () => {
  const result = Handlebars.compile("{{faker 'string.word' 20}}")({})
  expect(result).toMatchInlineSnapshot(`"string.word 20"`)
})
