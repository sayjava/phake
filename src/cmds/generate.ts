import fs from "node:fs";
import path from "node:path";
import { compile } from "../compile";
import { writeTemplateOutputToFile } from "../fs";
import { ArgumentsCamelCase } from "yargs";
import { registerFilePartials } from "../partials";

export const generateFromFile = ({ filePath, output, locale }) => {
  const template = fs.readFileSync(filePath, "utf-8");
  const content = compile({ template, locale });
  if (output) {
    const outputFile = writeTemplateOutputToFile({
      content,
      outPutDir: path.resolve(output),
      templatePath: filePath,
    });

    return console.log(
      `---> ${outputFile} has been generated from ${filePath} <---`,
    );
  }

  return console.log(content);
};

export const generateFromFolder = ({ directory, output, locale }) => {
  const entries = fs.readdirSync(directory).filter((entry) =>
    !entry.includes(".partial") && entry.includes(".hbs")
  );

  for (const entry of entries) {
    const filePath = path.join(directory, entry);

    if (fs.statSync(filePath).isDirectory()) {
      generateFromFolder({ directory: filePath, output, locale });
    } else {
      generateFromFile({ filePath, output, locale });
    }
  }
};

export const generate = (
  argv: ArgumentsCamelCase<
    { template: string; output: string; locale: string }
  >,
) => {
  const { template, output, locale } = argv;
  try {
    if (fs.statSync(template).isFile()) {
      registerFilePartials(path.dirname(template));
      return generateFromFile({ filePath: template, output, locale });
    }

    if (fs.statSync(template).isDirectory()) {
      registerFilePartials(template);
      return generateFromFolder({ directory: template, output, locale });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      return console.log(compile({ template }));
    }
    console.error(error);
  }
};
