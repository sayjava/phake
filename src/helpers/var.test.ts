import Handlebars from 'handlebars'
import './var'
test('var helper', () => {
  const result = Handlebars.compile("{{var 'name' 'john'}}{{name}}")({})
  expect(result).toMatchInlineSnapshot(`"john"`)
})
