import Handlebars from 'handlebars'
import './partial'

jest.mock('node:fs', () => ({
  existsSync: jest.fn(() => true),
  readFileSync: jest.fn(() => 'This is a partial {{app}}')
}))

test('inject helper', () => {
  const result = Handlebars.compile('{{inject "path/to/partial.hbs"}}')({
    app: 'sample app'
  })
  expect(result).toMatchInlineSnapshot(`"This is a partial sample app"`)
})
