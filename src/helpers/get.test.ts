import Handlebars from 'handlebars'
import './get'

test('get helper', () => {
  const result = Handlebars.compile(`{{get "person.firstName"}}`)({
    person: { firstName: 'John' }
  })
  expect(result).toMatchInlineSnapshot(`"John"`)
})

test('get helper', () => {
  const result = Handlebars.compile(`{{get "person.lastName"}}`)({
    person: { firstName: 'John' }
  })
  expect(result).toMatchInlineSnapshot(`""`)
})
