import Handlebars from 'handlebars'
import './select'

test('select helper the first undefined', () => {
  const result = Handlebars.compile(
    `{{select person.something person.firstName "missing-person"}}`
  )({
    person: { firstName: 'John' }
  })
  expect(result).toMatchInlineSnapshot(`"John"`)
})

test('return the default last value', () => {
  const result = Handlebars.compile(
    `{{select person.something person.else "missing-person"}}`
  )({
    person: { firstName: 'John' }
  })
  expect(result).toMatchInlineSnapshot(`"missing-person"`)
})
