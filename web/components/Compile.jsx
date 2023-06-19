import { useEffect, useState } from "react"
import Editor from '@monaco-editor/react';

function debounce(func, delay) {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}

export const Compile = () => {

    const initialContent = `
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
    `

    const [content, setContent] = useState('')

    const doCompile = async (template) => {
        fetch('/api/compile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ template })
        })
            .then(res => res.json())
            .then(({ content: parsedContent }) => {
                try {
                    setContent(JSON.stringify(JSON.parse(parsedContent), null, 2))
                } catch (error) {
                    setContent(error.toString())
                }
            })
    }

    useEffect(() => {
        doCompile(initialContent)
    }, [])

    const handleChange = debounce(doCompile, 500)

    return <div className="w-full">
        <div style={{ display: "flex" }}>
            <Editor height="70vh" theme="vs-dark"
                options={{ minimap: { enabled: false }, readOnly: false }}
                language="json"
                defaultValue={initialContent}
                onChange={handleChange}
            />
            <Editor height="70vh" theme="vs-dark"
                options={{ minimap: { enabled: false }, readOnly: true }}
                language="json"
                value={content}
            />
        </div>
    </div>
}