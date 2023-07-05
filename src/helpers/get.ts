/* eslint-disable */
import Handlebars from 'handlebars'

const unwrapIfSafeString = (val: any): any => {
  if (val instanceof Handlebars.SafeString) {
    val = val.toString()
  }
  return val
}

/*
 * Based on https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/lib/common.js.
 */
const getValue = (object: any, path: string): any => {
  let parts: any

  // for backwards compatibility
  if (!path) {
    return object
  }

  // unwrap Handlebars.SafeString for compatibility with `concat` etc.
  path = unwrapIfSafeString(path)

  // accept array or string for backwards compatibility
  if (typeof path === 'string') {
    parts = path.split('.')
  } else if (Array.isArray(path)) {
    parts = path
  } else {
    const key = String(path)
    return Object.keys(object).includes(key) ? object[key] : undefined
  }

  let result = object
  let prefix = ''
  for (let key of parts) {
    if (result === undefined || result === null) {
      return undefined
    }
    // preserve handling of trailing backslashes for backwards compatibility
    if (key.slice(-1) === '\\') {
      prefix = prefix + key.slice(0, -1) + '.'
      continue
    }
    key = prefix + key
    if (Object.keys(result).includes(key)) {
      result = result[key]
      prefix = ''
    } else {
      return
    }
  }
  return result
}

Handlebars.registerHelper('get', function (path, context) {
  const options = arguments[arguments.length - 1]
  const value = getValue(context.data.root, path)
  if (options !== undefined && options.fn !== undefined) {
    return value ? options.fn(value) : options.inverse(context)
  }
  return value
})
