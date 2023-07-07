import Handlebars from 'handlebars'
import * as allFaker from '@faker-js/faker'
import objectPath from 'object-path'

/**
 * Handlebars helper to generate mock data using fakerjs.
 */
const fake = new allFaker.Faker({ locale: [allFaker.en, allFaker.base] as allFaker.LocaleDefinition[] })
Handlebars.registerHelper('faker', function (...args: any[]): any {
  const [type, ...rest] = args
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
