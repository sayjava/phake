import Handlebars from 'handlebars'
import './repeat'

test('repeat helper', () => {
  const result = Handlebars.compile('{{#repeat 3}}true{{/repeat}}')({})
  expect(result).toMatchInlineSnapshot(`"true,true,true"`)
})
