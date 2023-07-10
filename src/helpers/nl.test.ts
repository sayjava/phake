import Handlebars from 'handlebars'
import './nl'

test('nlbr', () => {
  const result = Handlebars.compile(`
        {
          "message": {{{nlbr "This is a paragraph.\nThis is another paragraph.\nThis is a third paragraph."}}}
        }
    `)({})
  expect(JSON.parse(result)).toMatchInlineSnapshot(`
    {
      "message": "This is a paragraph
    This is another paragraph
    This is a third paragraph.",
    }
  `)
})
