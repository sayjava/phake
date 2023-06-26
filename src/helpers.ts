import Handlebars from 'handlebars'
import * as allFaker from '@faker-js/faker'
import objectPath from 'object-path'
import extraHelpers from 'handlebars-helpers'

export const createHelpers = ({ locale }: { locale: string }): void => {
  extraHelpers()
  Handlebars.registerHelper('repeat', function (count: number, options: any) {
    const MAX_COUNT = 100000
    if (Number.isNaN(count)) {
      throw new Error('Each section requires a number')
    }

    const list: string[] = []
    for (let index = 0; index < Math.min(count, MAX_COUNT); index++) {
      list.push(options.fn(this, { data: { index } }))
    }
    return list.join(',')
  })

  Handlebars.registerHelper('randomize', function (...args: any) {
    const [, ...rest] = Array.from(args).reverse()
    const randomIdex = Math.floor(Math.random() * rest.length)
    return rest[randomIdex]
  })

  Handlebars.registerHelper(
    'setVar',
    function (name: string, value: any, options: any) {
      options.data.root[name] = value
    }
  )

  Handlebars.registerHelper('faker', function (...args: any[]): any {
    const [type, ...rest] = args
    const suppliedLocale = allFaker[locale]

    if (suppliedLocale === undefined) {
      throw new Error(`${locale} is not supported by FakerJS`)
    }

    const fakerLocale =
      locale === 'en' ? allFaker.en : [suppliedLocale, allFaker.en]
    const fake = new allFaker.Faker({ locale: fakerLocale })
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

  Handlebars.registerHelper('helperMissing', function (...args: any[]): string {
    try {
      const [{ name }] = args.concat().reverse()
      return `${String(name)} helper is not available`
    } catch (error) {
      return error.message
    }
  })
}

export const registerHelper = Handlebars.registerHelper
