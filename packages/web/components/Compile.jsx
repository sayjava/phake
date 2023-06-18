import { useEffect, useState } from "react"

export const Compile = () => {

    const example = `
    {{setVar 'login' 'sayjava'}}
    {
        "id": {{faker 'number.int' 10}},
        "node_id": "{{faker 'string.alpha' 25}}",
        "name": "{{faker 'word.noun'}}",
        "full_name": "{{login}}/{{faker 'word.noun'}}",
        "language": "{{randomize 'javascript' 'ruby' 'golang' 'c++'}}",
        "forks_count": {{faker 'number.int' max=10000}},
        "forks": {{faker 'number.int' max=10000}},
        "stargazers_count": {{faker 'number.int' max=10000}},
        "watchers_count": {{faker 'number.int' max=10000}},
        "watchers": {{faker 'number.int' max=10000}},
        "size": {{faker 'number.float' max=10000 precision=0.2}},
        "default_branch": "{{randomize 'main' 'master'}}",
        "open_issues_count": {{faker 'number.int' max=50}},
        "open_issues": {{faker 'number.int' max=10}},
        "is_template": {{randomize false true}},
        "description": "{{faker 'lorem.sentences' max=3}}"
      }
    `

    const [content, setContent] = useState('')

    const doCompile = async () => {
        fetch('/api/compile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                template: example
            })
        })
            .then(res => res.json())
            .then(({ content }) => {
                try {
                    setContent(JSON.stringify(JSON.parse(content), null, 2))
                } catch (error) {
                    setContent(error.toString())
                }
            })
    }

    useEffect(() => {
        doCompile()
    }, [])

    return <div>
        <h2>Hello Welcome to the data generator platform</h2>
        <div>
            <pre>
                {example}
            </pre>
        </div>
        <div>
            <button onClick={doCompile}>Compile</button>
        </div>
        <div>
            {content}
        </div>
    </div>
}