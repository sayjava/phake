import Handlebars from 'handlebars'
import fs from 'node:fs'
import path from 'node:path'

Handlebars.registerHelper('inject', function (file: string, options: any) {
    if (!file) {
        throw new Error(`Helper Inject requires a file`)    
    }
    
    if(fs.existsSync(file) === false) {
        throw new Error(`File "${file}" does not exist`)
    }

    const partialName = path.parse(file).name
    if(Handlebars.partials[path.parse(file).name]) { 
        Handlebars.registerPartial(partialName, fs.readFileSync(file, 'utf-8'))
    }
    return Handlebars.compile(fs.readFileSync(file, 'utf-8'))(options.data.root)
})