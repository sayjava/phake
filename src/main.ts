#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-floating-promises */
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generate } from './cmds/generate';

(async () => {
  await yargs(hideBin(process.argv))
    .command(
      'compile',
      'Compiles template(s) from a string, file or folder containing .hbs template files',
      (y) => {
        y.options(
          {
            template: {
              type: 'string',
              alias: 't',
              describe:
                'template string | template file | directory of template files',
              demandOption: true
            },
            output: {
              type: 'string',
              alias: 'o',
              default: '.',
              describe: 'The directory to write the output'
            },
            locale: {
              type: 'string',
              alias: 'l',
              default: 'en',
              describe:
                'The locale that is passed on to FakerJS for data generation'
            }
          }
        )
      },
      (argv) => generate(argv as any)
    )
    .help()
    .argv
})()
