import Handlebars from 'handlebars'
import './helpers'

interface GenerateInterface {
  template: string
  locale?: string
  context?: {
    [key: string]: any
  }
}

export const compile = (gi: GenerateInterface): string => {
  const { template, context = {} } = gi
  return Handlebars.compile(template, { compat: true, preventIndent: false })({
    context
  })
}

export const registerPartial = Handlebars.registerPartial
