import Handlebars from 'handlebars'
import './nl'

test('nlbr', () => {
  const result = Handlebars.compile(`
        <p>{{nlbr "This is a paragraph."}}</p>
        <p>{{nlbr "This is a paragraph." "This is another paragraph."}}</p>
    `)({})
  expect(result).toMatchInlineSnapshot(`
    "
            <p>This is a paragraph.</p>
            <p>This is a paragraph.</p>
        "
  `)
})
