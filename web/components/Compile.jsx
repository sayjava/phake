import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { compile } from '@sayjava/phake-cli/lib/compile'
import { templates } from '../templates'

function debounce(func, delay) {
  let timeoutId

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

export const Compile = () => {

  const [currTemplate, setCurrTemplate] = useState(templates[0].name)
  const [content, setContent] = useState('')

  const doCompile = (template) => {
    try {
      const newContent = compile({ template })
      setContent(newContent, null, 2)
    } catch (error) {
      setContent(error.toString())
    }
  }

  const handleChange = debounce(doCompile, 500)
  const changeTemplate = (e) => {
    setCurrTemplate(e.target.value)
    doCompile(templates.find((template) => template.name === e.target.value).template)
  }

  useEffect(() => {
    doCompile(
      templates.find((template) => template.name === currTemplate).template
    )
  }, [currTemplate])

  return (
    <div className='w-full'>
      <div className='my-4 flex space-x-4'>
        <label className='inline-block' htmlFor="examples">Examples</label>
        <select id='examples' className='inline-block'
          onChange={(e) => { changeTemplate(e) }}>
          {
            templates.map((template) => (
              <option key={template.name} value={template.name}>{template.label}</option>
            ))
          }
        </select>
      </div>


      <div style={{ display: 'flex' }}>
        <Editor
          height='70vh' theme='vs-dark'
          options={{ minimap: { enabled: false }, readOnly: false }}
          language={currTemplate}
          value={templates.find((template) => template.name === currTemplate).template}
          onChange={handleChange}
        />
        <Editor
          height='70vh' theme='vs-dark'
          options={{ minimap: { enabled: false }, readOnly: true, formatOnPaste: true, formatOnType: true, renderControlCharacters: false, renderWhitespace: 'none', renderFinalNewline: true, renderIndentGuides: true, renderLineHighlight: 'none', renderLineNumbers: 'off', renderValidationDecorations: 'off', scrollBeyondLastLine: false, wordWrap: 'on' }}
          language={currTemplate}
          value={content}
        />
      </div>
    </div>
  )
}
