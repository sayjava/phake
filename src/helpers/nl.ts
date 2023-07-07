import Handlebars from 'handlebars'

/**
 * Replace newlines with <br> tags.
 */
Handlebars.registerHelper('nlbr', function (text: string) {
  return Handlebars.escapeExpression(text).replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + '<br>' + '$2'
  )
})
