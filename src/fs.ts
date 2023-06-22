import path from 'node:path'
import fs from 'node:fs'

interface TemplateOutput {
  templatePath: string
  outPutDir: string
  content: string
}

export const writeTemplateOutputToFile = (
  { content, outPutDir, templatePath }: TemplateOutput
): string => {
  const filePath = path.basename(templatePath)
  const [outPutName] = filePath.split(path.extname(filePath))

  fs.mkdirSync(outPutDir, { recursive: true })
  const outputPathName = path.join(outPutDir, outPutName)
  fs.writeFileSync(outputPathName, content)
  return outputPathName
}
