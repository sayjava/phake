import Handlebars from 'handlebars'
import * as allFaker from '@faker-js/faker'
import objectPath from 'object-path'

const locale = 'en'

Handlebars.registerHelper('faker', function (...args: any[]): any {
  const [type, ...rest] = args
  const suppliedLocale = allFaker[locale]

  if (suppliedLocale === undefined) {
    throw new Error(`${locale} is not supported by FakerJS`)
  }

  const fakerLocale =
    locale === 'en' ? allFaker.en : [suppliedLocale, allFaker.en]
  const fake = new allFaker.Faker({ locale: [fakerLocale, allFaker.base] as allFaker.LocaleDefinition[] })
  const fakeFunc = objectPath.get(fake, type)
  const [{ hash }, ...params] = rest.concat().reverse()

  if (fakeFunc !== undefined) {
    if (Object.keys(hash).length > 0) {
      return fakeFunc(hash)
    }

    return fakeFunc(...params)
  }

  return `fakerjs does not support ${String(type)}`
})
