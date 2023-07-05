import Handlebars from 'handlebars'

Handlebars.registerHelper('randomize', function (...args: any) {
  const [, ...rest] = Array.from(args).reverse()
  const randomIdex = Math.floor(Math.random() * rest.length)
  return rest[randomIdex]
})
