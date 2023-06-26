import fs from 'node:fs'
import Handlebars from 'handlebars'
import path from 'node:path'

const registerPartial = (entry: string): void => {
  try {
    const { name } = path.parse(entry)
    const [partialName] = name.split('.partial')
    Handlebars.registerPartial(partialName, fs.readFileSync(entry, 'utf-8'))
  } catch (error) {
    console.error(`Error registering ${entry} as partial`)
  }
}

export const registerFilePartials = (partialsPath: string): void => {
  try {
    const entries = fs
      .readdirSync(partialsPath)
      .filter((entry) => entry.includes('.partial'))

    for (const entry of entries) {
      const fullPath = path.join(partialsPath, entry)
      if (!fs.statSync(fullPath).isDirectory()) {
        registerPartial(fullPath)
      } else {
        registerFilePartials(fullPath)
      }
    }
  } catch (error) {
    console.warn(error.message)
  }
}
