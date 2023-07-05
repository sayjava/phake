import Handlebars from 'handlebars'

Handlebars.registerHelper('helperMissing', function (...args: any[]): string {
  try {
    const [{ name }] = args.concat().reverse()
    return `${String(name)} helper is not available`
  } catch (error) {
    return error.message
  }
})
