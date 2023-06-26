<h1 align="center">Phake</h1>
<p align="center">Effortlessly Generate Realistic Mock Data with Ease using Handlebars and Fakerjs</p>
<div align="center"><a href="https://phake-d4468.web.app/editor">Try it online</a></div>

## Features

- Utilize the power of declarative templates using
  [Handlebars](https://handlebarsjs.com).
- Seamlessly integrate with [Faker.js](https://fakerjs.dev) for generating
  realistic and randomized data.
- Enjoy the simplicity of a command-line interface for streamlined usage.
- Incorporate the tool into your development process and easily version your
  templates.
- Promote code reuse and maintainability by creating DRY (Don't Repeat Yourself)
  templates, allowing you to reuse template sections across multiple templates.
- Leverage custom Handlebars helpers to simplify data creation and manipulation,
  further enhancing the flexibility and functionality of your templates.

## Quick Start

Create a template file named `sample.json.hbs` with the following content

```template filename="sample.json.hbs"
 {
    "id": {{faker 'number.int' 10}},
    "node_id": "{{faker 'string.alpha' 25}}",
    "name": "{{faker 'word.noun'}}",
    "language": "{{randomize 'javascript' 'ruby' 'golang' 'c++'}}",
    "forks_count": {{faker 'number.int' max=10000}},
    "size": {{faker 'number.float' max=10000 precision=0.2}},
    "default_branch": "{{randomize 'main' 'master'}}",
    "open_issues_count": {{faker 'number.int' max=50}},
    "is_template": {{randomize false true}},
    "description": "{{faker 'lorem.sentences' max=3}}",
    "topics": [
        {{#repeat 5}}
            "{{faker 'string.alpha' 5}}"
        {{/repeat}}
    ]
}
```

Run the `phake-cli` command to compile the template into user.json

```shell
npx @sayjava/phake-cli compile -t sample.json.hbs
```

```json
{
  "id": 7,
  "node_id": "HSUWMxwXsVKxycdaVOiJFnlNe",
  "name": "factory",
  "language": "javascript",
  "forks_count": 4558,
  "size": 8800,
  "default_branch": "master",
  "open_issues_count": 9,
  "is_template": true,
  "description": "Aliquam sunt eveniet quam",
  "topics": [
    "UiqiJ",
    "GdyVl",
    "LUiDO",
    "QEHha",
    "Ksvjv"
  ]
}
```

## Phake Compile

The Phake CLI uses [Handlebars](https://handlebarsjs.com) and
[FakerJS](https://fakerjs.dev) to generate sample data for development purposes.
It allows you to define data templates using Handlebars syntax and generate
realistic sample data based on those templates, incorporating fake data
generated by [FakerJS](https://fakerjs.dev).

### Installation

```shell
npm i -g @sayjava/phake-cli
```

### CLI Options

| Flag           | Default | Description                             |
| -------------- | ------- | --------------------------------------- |
| -t, --template | -       | file/directory containing `.hbs` files  |
| -o, --output   | cwd     | The directory to write the output files |

## File Naming

Improve the functionality of the `phake` CLI with the following enhancements:

- The `phake` CLI now intelligently uses file extensions to name the output
  files that are written to the output directory.
- If no file extension is supplied, the output file will still be created but
  without any file extension.
- This flexible approach allows you to specify the desired file extension for
  the output, providing compatibility with various file formats and ensuring
  clarity in file naming.
- You can now generate output files with the appropriate extensions, making it
  easier to identify and work with the generated files.
- This enhancement adds versatility to the `phake` CLI, catering to a wider
  range of use cases and preferences.

Examples

| Input           | Output      |
| --------------- | ----------- |
| sample.json.hbs | sample.json |
| sample.yaml.hbs | sample.yaml |
| sample.hbs      | sample      |

### Usage

```shell
phake compile -t name-of-template.hbs
```

Compile a folder containing `.hbs` files

```shell
phake -t dir/containing-hbs-files -o folder/to/write/output
```

Compile a single `[name].hbs` file

```shell
phake -t dir/containing/single.hbs -o folder/to/write/output
```

Compile a single `[name].json.hbs` file with an explicit file extension. This
will create `[name].json`

```shell
phake -t dir/containing/single.json.hbs -o folder/to/write/output
```

## DRY Templates with Handlebar's Partials

- Enable easy reuse of template sections by naming them as `[name].partial.hbs`.
- Partial files are not compiled individually but instead registered as
  Handlebar partials. This allows them to be referenced and included within
  other template files seamlessly.
- By adopting this approach, you can efficiently organize and manage your
  templates, promoting modular and reusable code.
- The registration of partials ensures that changes made to a partial file
  reflect automatically across all templates that reference it.
- This method of partial registration enhances maintainability and reduces
  duplication of code within your project.

Example

```hbs
{
  "title": "{{ faker "company.name" }}",
  "price": "{{ faker "commerce.price" min=100 max=200 dec=0 symbol='£' }}"
}
```

The partial can then be referenced from other template files

```hbs
{
  "items": [
    {{#repeat 3}}
        {{> item }}
    {{/repeat}}
  ],
}
```

## Template Helpers

`phake` ships with some handy helpers that eases data generation. All
[Handlebar Helpers](https://handlebarsjs.com/guide/builtin-helpers.html) are
also supported.

| Helper    | Description                          | Example                                                     |
| --------- | ------------------------------------ | ----------------------------------------------------------- |
| repeat    | Repeat items                         | `{{#repeat 5}} index-{{@index}} {{/repeat}}`                |
| randomize | Randomize an array                   | `{{randomize "german shepard" "golden retriever" "pug"}}`   |
| setVar    | Register a variable to be used later | `{{#setVar 'myVar' 5 }}` then accessed later as `{{myVar}}` |

## Examples

See the examples folder for more advance use cases

- [GitHub Sample Data](examples/github)
- [Stripe Sample Data](examples/stripe)
