import Handlebars from 'handlebars'
import './randomize'

test('randomize', () => {
  const template =
    'My dogs\'s breed is {{randomize "german shepard" "golden retriever" "pug"}}'
  const result = Handlebars.compile(template)({})
  expect(result).toMatch(
    /My dogs's breed is pug|golden retrieve|german shepard/
  )
})
