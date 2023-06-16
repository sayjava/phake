import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "./cmds/generate";

(async () => {
  await yargs(hideBin(process.argv))
    .command(
      "compile",
      "Compiles template(s) from a string, file or folder containing .hbs template files",
      (y) => {
        y.options(
          {
            template: {
              type: "string",
              alias: "t",
              describe:
                "template string | template file | directory of template files",
              demandOption: true,
            },
            output: {
              type: "string",
              alias: "o",
              describe: "The directory to write the output",
            },
          },
        );
      },
      (argv) => generate(argv as any),
    )
    .help()
    .argv;
})();
