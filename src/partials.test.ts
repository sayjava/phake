import { Faker } from '@faker-js/faker'
import { compile } from './compile'
import { registerFilePartials } from './partials'

jest.mock('@faker-js/faker', () => {
  return {
    en: [],
    Faker: jest.fn(() => {
      return {
        company: { name: () => 'sample-company' },
        commerce: { price: () => 10.0 }
      }
    })
  }
})

test('renders simple partial', () => {
  const template = `
    [
      {{# repeat 2}}
          {{> item}}
      {{/repeat}}
    ]
  `
  registerFilePartials('./fixtures')
  const result = compile({ template })
  const json = JSON.parse(result)
  expect(json).toMatchInlineSnapshot(`
[
  {
    "price": "10",
    "title": "sample-company",
  },
  {
    "price": "10",
    "title": "sample-company",
  },
]
`)
})

test('renders recursive partials', () => {
  const template = '{{> items}}'
  const result = compile({
    template,
    context: { name: 'foo bar ltd' }
  })
  const json = JSON.parse(result)
  expect(json).toMatchInlineSnapshot(`
{
  "hello": "foo bar ltd",
  "items": [
    {
      "price": "10",
      "title": "sample-company",
    },
    {
      "price": "10",
      "title": "sample-company",
    },
    {
      "price": "10",
      "title": "sample-company",
    },
  ],
  "money": {
    "amount": "10",
  },
}
`)
})
