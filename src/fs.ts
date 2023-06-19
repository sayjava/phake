import path from "node:path";
import fs from "node:fs";

interface TemplateOutput {
  templatePath: string;
  outPutDir?: string;
  content: string;
}

export const writeTemplateOutputToFile = (
  { content, outPutDir, templatePath }: TemplateOutput,
) => {
  let dir = outPutDir;
  let filePath = path.basename(templatePath);
  let [outPutName] = filePath.split(path.extname(filePath));

  if (!outPutDir) {
    dir = path.dirname(templatePath);
  }

  fs.mkdirSync(dir, { recursive: true });
  const outputPathName = path.join(dir, outPutName);
  fs.writeFileSync(outputPathName, content);
  return outputPathName;
};
