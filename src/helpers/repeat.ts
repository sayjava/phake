import Handlebars from 'handlebars'

/**
 * Repeat a section a number of times.
 */
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
