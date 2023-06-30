export const templates = [
  {
    name: 'json',
    label: 'JSON',
    template: `
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
    "description": "{{faker 'lorem.sentences' max=1}}",
    "topics": [
    {{#repeat 5}}
        "{{faker 'string.alpha' 5}}"
    {{/repeat}}
    ]
}
      `,
  },
  {
    name: 'csv',
    label: 'CSV',
    template: `firstName,lastName,email
{{#for 1 10}}
{{faker 'person.firstName'}},{{faker 'person.lastName'}},{{faker 'internet.email'}}
{{/for}}
      `
  },
  {
    name: 'xml',
    label: 'XML',
    template: `
<root>
  <id>{{faker 'number.int' 10}}</id>
  <node_id>{{faker 'string.alpha' 25}}</node_id>
  <name>{{faker 'word.noun'}}</name>
  <language>{{randomize 'javascript' 'ruby' 'golang' 'c++'}}</language>
  <forks_count>{{faker 'number.int' max=10000}}</forks_count>
  <size>{{faker 'number.float' max=10000 precision=0.2}}</size>
  <default_branch>{{randomize 'main' 'master'}}</default_branch>
  <open_issues_count>{{faker 'number.int' max=50}}</open_issues_count>
  <is_template>{{randomize false true}}</is_template>
  <description>{{faker 'lorem.sentences' max=1}}</description>
  <topics>
    {{#for 1 5}}
      <topic>{{faker 'string.alpha' 5}}</topic>
    {{/for}}
  </topics>
</root>
      `
  },
  {
    name: 'yaml',
    label: 'YAML',
    template: `id: {{faker 'number.int' 10}}
node_id: {{faker 'string.alpha' 25}}
name: {{faker 'word.noun'}}
language: {{randomize 'javascript' 'ruby' 'golang' 'c++'}}
forks_count: {{faker 'number.int' max=10000}}
size: {{faker 'number.float' max=10000 precision=0.2}}     
      `
  },
  {
    name: 'sql',
    label: 'SQL',
    template: `
INSERT INTO users (id, node_id, name, language, forks_count, size, default_branch, open_issues_count)
{{#for 1 10}}
VALUES ({{faker 'number.int' 10}},
  "{{faker 'string.alpha' 25}}",
  "{{faker 'word.noun'}}",
  "{{randomize 'javascript' 'ruby' 'golang' 'c++'}}",
  {{faker 'number.int' max=10000}},
  {{faker 'number.float' max=10000 precision=0.2}},
  "{{randomize 'main' 'master'}}",
  {{faker 'number.int' max=50}}
)
{{/for}}
      `
  }
]