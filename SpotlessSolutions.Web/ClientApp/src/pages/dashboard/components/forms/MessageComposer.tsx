import Bold from '@tiptap/extension-bold'
import { type ChangeEvent, useState } from 'react'
import DOMPurify from 'dompurify'
import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Heading, { type Level } from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Stack from '@mui/material/Stack'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline
} from 'react-icons/ai'

import ControlComponent, { type ControlComponentProps } from './ControlComponent.tsx'
import './MessageComposer.styles.scss'

interface MessageComposerProps {
  onSendMessage: (subject: string, message: string) => void
}

export default function MessageComposer (props: MessageComposerProps) {
  const [subjectField, setSubjectField] = useState<string>('')

  const editor = useEditor({
    extensions: [
      Bold,
      Document,
      Heading.configure({
        HTMLAttributes: {
          class: 'override-text-size'
        },
        levels: [1, 2, 3, 4, 5, 6]
      }),
      Italic,
      Link,
      Paragraph,
      Text,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ]
  })

  const controls: ControlComponentProps[] = [
    {
      title: 'Bold',
      onClick: () => {
        editor?.chain().focus().toggleBold().run()
      },
      Icon: AiOutlineBold,
      isActive: editor?.isActive('bold') ?? false
    },
    {
      title: 'Italic',
      onClick: () => {
        editor?.chain().focus().toggleItalic().run()
      },
      Icon: AiOutlineItalic,
      isActive: editor?.isActive('italic') ?? false
    },
    {
      title: 'Underline',
      onClick: () => {
        editor?.chain().focus().toggleUnderline().run()
      },
      Icon: AiOutlineUnderline,
      isActive: editor?.isActive('underline') ?? false
    },
    {
      title: 'Align Left',
      onClick: () => {
        editor?.chain().focus().setTextAlign('left').run()
      },
      Icon: AiOutlineAlignLeft,
      isActive: editor?.isActive({ textAlign: 'left' }) ?? false
    },
    {
      title: 'Align Center',
      onClick: () => {
        editor?.chain().focus().setTextAlign('center').run()
      },
      Icon: AiOutlineAlignCenter,
      isActive: editor?.isActive({ textAlign: 'center' }) ?? false
    },
    {
      title: 'Align Right',
      onClick: () => {
        editor?.chain().focus().setTextAlign('right').run()
      },
      Icon: AiOutlineAlignRight,
      isActive: editor?.isActive({ textAlign: 'right' }) ?? false
    }
  ]

  const getActiveLevel = (): number => {
    if (editor === null) {
      return 0
    }

    if (editor.isActive('heading', { level: 1 })) {
      return 1
    }

    if (editor.isActive('heading', { level: 2 })) {
      return 2
    }

    if (editor.isActive('heading', { level: 3 })) {
      return 3
    }

    if (editor.isActive('heading', { level: 4 })) {
      return 4
    }

    if (editor.isActive('heading', { level: 5 })) {
      return 5
    }

    return 0
  }

  const handleSubjectFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubjectField(e.currentTarget.value)
  }

  const changeHeadingLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)
    if (isNaN(value) || value <= 0 || value >= 6) {
      editor?.chain().toggleHeading({ level: getActiveLevel() as Level }).run()
      return
    }

    editor?.chain().toggleHeading({ level: value as Level }).run()
  }

  const sendMessage = () => {
    const purified = DOMPurify.sanitize(editor?.getHTML() ?? '')
    props.onSendMessage(subjectField, purified)
  }

  return (
    <>
      <div className="subject-field-group">
        <label className="subject-label" htmlFor="subject_field">Subject</label>
        <input
          className="subject-input"
          type="text"
          onChange={handleSubjectFieldChange}
          value={subjectField}
          placeholder="Your subject..."
        />
      </div>
      <div className="editor-box">
        <div className="editor-controls">
          <Stack direction="row" spacing={1} alignItems="center">
            <select
              className="editor-font-selector"
              value={getActiveLevel().toString()}
              onChange={changeHeadingLevel}
            >
              <option value="0">Default</option>
              <option value="1">h1. Heading</option>
              <option value="2">h2. Heading</option>
              <option value="3">h3. Heading</option>
              <option value="4">h4. Heading</option>
              <option value="5">h5. Heading</option>
            </select>
            {
              controls.map((c, i) => (
                <ControlComponent key={i} {...c} />
              ))
            }
          </Stack>
        </div>
        <div className="editor-contents">
          <EditorContent editor={editor}/>
        </div>
      </div>
      <div className="button-group">
        <button className="btn-send" onClick={sendMessage}>Send Message</button>
      </div>
    </>
  )
}
