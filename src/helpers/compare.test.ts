import Handlebars from 'handlebars'
import './compare'

test('compare helper', () => {
    const result = Handlebars.compile(
        '{{#compare 1 1 operator="!="}}true{{else}}false{{/compare}}'
    )({})
    expect(result).toMatchInlineSnapshot(`"false"`)
})

test('compare helper with typeof', () => {
    const result = Handlebars.compile(
        '{{#compare 1 "number" operator="typeof"}}true{{else}}false{{/compare}}'
    )({})
    expect(result).toMatchInlineSnapshot(`"true"`)
})

test('compare helper with typeof', () => {
    const compile = Handlebars.compile(
        '{{#compare 1}}true{{else}}false{{/compare}}'
    )
    expect(compile).toThrowError()
})