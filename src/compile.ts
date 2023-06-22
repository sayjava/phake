import Handlebars from 'handlebars'
import { createHelpers } from './helpers'

interface GenerateInterface {
  template: string
  locale?: string
  context?: {
    [key: string]: any
  }
}

export const compile = (gi: GenerateInterface): string => {
  const { template, locale = 'en', context = {} } = gi
  createHelpers({ locale })
  return Handlebars.compile(template, { compat: true, preventIndent: false })({
    context
  })
}

export const registerPartial = Handlebars.registerPartial
