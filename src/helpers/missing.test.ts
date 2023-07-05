import Handlebars from 'handlebars'
import './missing'

test('missing helper', () => {
  const result = Handlebars.compile("{{missing 'name'}}")({})
  expect(result).toMatchInlineSnapshot(`"missing helper is not available"`)
})
