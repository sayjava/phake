<h1 align="center">Phake</h1>
<p align="center">The quickest way to generate sample data for development purposes</p>

Quickly turn a simple Handlebars template like this

```json
{
  "id": "{{faker 'number.int' 10}}",
  "node_id": "{{faker 'string.alpha' 25}}",
  "name": "{{faker 'word.noun'}}",
  "language": "{{randomize 'javascript' 'ruby' 'golang' 'c++'}}",
  "forks_count": {{faker 'number.int' max=10000}},
  "size": {{faker 'number.float' max=10000 precision=0.2}},
  "default_branch": "{{randomize 'main' 'master'}}",
  "is_template": {{randomize false true}},
  "description": "{{faker 'lorem.sentences' max=3}}",
  "topics": [
    {{#repeat 5}}
        "{{faker 'string.alpha' 5}}"
    {{/repeat}}
  ]
}
```

into a ready to use sample data document like this

```json
{
  "id": "0",
  "node_id": "FWzzetrLQuFkdFeCLTDlcLBfO",
  "name": "peasant",
  "language": "golang",
  "forks_count": 9984,
  "size": 625.4,
  "default_branch": "main",
  "is_template": true,
  "description": "Nam repellendus quod maiores debitis recusandae non",
  "topics": [
    "eZjFY",
    "PekEj",
    "HPoqg",
    "yGcyT",
    "LTcZM"
  ]
}
```

with a simple the phake cli tool

```sh
npx @sayjava/phake-cli compile -t 'path-to-file.hbs' -o output/dir
```

## Phake CLI

The Phake CLI uses [Handlebars](https://handlebarsjs.com) and
[FakerJS](https://fakerjs.dev) to generate sample data for development purposes.
It allows you to define data templates using Handlebars syntax and generate
realistic sample data based on those templates, incorporating fake data
generated by [FakerJS](https://fakerjs.dev).

### Quick Start

Quickly generate an array of 5 names using the fakerjs library

```sh
npx @sayjava/phake-cli compile -t '[ {{#repeat 5}} "{{faker "person.firstName" }}" {{/repeat}} ]'
```

### Features

- **Handlebars Templates:** Define data templates using the powerful Handlebars
  syntax. Declarative sample data generation
- **FakerJS Integration:** Generate realistic fake data using Faker's extensive
  library of data types.
- **Generate Varied Templates:** Not limited to JSON files, any form of textual
  templates can be generated. See the examples folder
- **CLI Interface:** A command-line interface for easy interaction and
  automation.

## Installation

To install the Phake Data Generator CLI, you need to have Node.js and npm (Node
Package Manager) installed on your system. Then, run the following command:

```shell
npm install -g @sayjava/phake-cli
```

## Usage

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

## Handlebars Templates

`phake` combines handlebars templates and fakerjs with various helpers to make
the goal of sample data generation a breeze

### Using FakerJS

`phake` includes a helper that gives access to the full dataset of FakerJS. This
is very useful for generating realistic datasets for mock environment. Below is
an example of how the fakerJS library can be used in a template

```handlebars
{
  "name": "{{faker 'person.firstName' }} {{faker 'person.lastName' }}",
  "email": "{{faker 'person.email' }}",
  "age": {{fake 'number.int' min=18 max=65}}
}
```

### DRY Templates With Handlebar's Partials

Pieces of templates can be reused easily by naming them as `[name].partial.hbs`.
Partial files are not compiled but registered as Handlebar partials to be
referenced from other template files

Here is an example of a partial file named `item.partial.hbs` containing the
following text.

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

and compiled as

### Template Helpers

`phake` ships with some handy helpers that eases data generation. All
[Handlebar Helpers](https://handlebarsjs.com/guide/builtin-helpers.html) are
also supported.

| Helper    | Description                          | Example                                                     |
| --------- | ------------------------------------ | ----------------------------------------------------------- |
| repeat    | Repeat items                         | `{{#repeat 5}} index-{{@index}} {{/repeat}}`                |
| randomize | Randomize an array                   | `{{randomize "german shepard" "golden retriever" "pug"}}`   |
| setVar    | Register a variable to be used later | `{{#setVar 'myVar' 5 }}` then accessed later as `{{myVar}}` |

### Example Sample Data APIs

See the examples folder for more advance use cases

- [GitHub Sample Data](examples/github)
- [Stripe Sample Data](examples/stripe)
