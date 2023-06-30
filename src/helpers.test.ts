import { compile } from './compile'

test('variable is set', () => {
  const result = compile({
    template: "{{#setVar 'myName' 'John Doe' }} {{/setVar}} Hello {{myName}}"
  })
  expect(result).toMatchInlineSnapshot(`" Hello John Doe"`)
})

test('repeat', () => {
  const result = compile({
    template: '{{#repeat 3}}index-{{@index}}{{/repeat}}'
  })
  expect(result).toMatchInlineSnapshot(`"index-0,index-1,index-2"`)
})

test('for', () => {
  const result = compile({
    template: '{{#for 1 3}} index-{{@index}} {{/for}}'
  })
  expect(result).toMatchInlineSnapshot(`" index-1  index-2  index-3 "`)
})

test('randomize', () => {
  const template =
    'My dogs\'s breed is {{randomize "german shepard" "golden retriever" "pug"}}'
  const result = compile({ template })
  expect(result).toMatch(
    /My dogs's breed is pug|golden retrieve|german shepard/
  )
})

test('missing helper', () => {
  const template = `Hello from {{something-with-param 'hello world' 10}} | {{something-no-param}} | {{something-with-hash name="wolobby"}}`
  const result = compile({ template })
  expect(result).toMatchInlineSnapshot(
    `"Hello from something-with-param helper is not available | something-no-param helper is not available | something-with-hash helper is not available"`
  )
})
