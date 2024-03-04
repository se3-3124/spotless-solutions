import Bold from '@tiptap/extension-bold'
import { EditorContent, useEditor } from '@tiptap/react'
import FormControl from '@mui/material/FormControl'
import Document from '@tiptap/extension-document'
import Heading, { type Level } from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import InputLabel from '@mui/material/InputLabel'
import Link from '@tiptap/extension-link'
import MenuItem from '@mui/material/MenuItem'
import Paragraph from '@tiptap/extension-paragraph'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded'
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded'
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded'
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded'
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded'
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded'
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded'

import ControlComponent, { type ControlComponentProps } from './ControlComponent.tsx'
import './MessageComposer.styles.scss'

interface MessageComposerProps {
  onSendMessage: (message: string) => void
}

export default function MessageComposer (props: MessageComposerProps) {
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
      Icon: FormatBoldRoundedIcon,
      isActive: editor?.isActive('bold') ?? false
    },
    {
      title: 'Italic',
      onClick: () => {
        editor?.chain().focus().toggleItalic().run()
      },
      Icon: FormatItalicRoundedIcon,
      isActive: editor?.isActive('italic') ?? false
    },
    {
      title: 'Underline',
      onClick: () => {
        editor?.chain().focus().toggleUnderline().run()
      },
      Icon: FormatUnderlinedRoundedIcon,
      isActive: editor?.isActive('underline') ?? false
    },
    {
      title: 'Align Left',
      onClick: () => {
        editor?.chain().focus().setTextAlign('left').run()
      },
      Icon: FormatAlignLeftRoundedIcon,
      isActive: false
    },
    {
      title: 'Align Center',
      onClick: () => {
        editor?.chain().focus().setTextAlign('center').run()
      },
      Icon: FormatAlignCenterRoundedIcon,
      isActive: false
    },
    {
      title: 'Align Right',
      onClick: () => {
        editor?.chain().focus().setTextAlign('right').run()
      },
      Icon: FormatAlignRightRoundedIcon,
      isActive: false
    },
    {
      title: 'Justify',
      onClick: () => {
        editor?.chain().focus().setTextAlign('justify').run()
      },
      Icon: FormatAlignJustifyRoundedIcon,
      isActive: false
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

  const changeHeadingLevel = (e: SelectChangeEvent) => {
    const value = Number(e.target.value)
    if (isNaN(value) || value <= 0 || value >= 6) {
      editor?.chain().toggleHeading({ level: getActiveLevel() as Level }).run()
      return
    }

    editor?.chain().toggleHeading({ level: value as Level }).run()
  }

  const sendMessage = () => {
    props.onSendMessage(editor?.getHTML() ?? '')
  }

  return (
    <>
      <div className="editor-box">
        <div className="editor-controls">
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl size="small" sx={{ width: '16vw' }}>
              <InputLabel id="font-type-selection-label">Font Type</InputLabel>
              <Select
                labelId="font-type-selection-label"
                id="font-type-selection"
                value={getActiveLevel().toString()}
                onChange={changeHeadingLevel}
                label="Font Type">
                <MenuItem value={0}>Default</MenuItem>
                <MenuItem value={1}>h1. Heading</MenuItem>
                <MenuItem value={2}>h2. Heading</MenuItem>
                <MenuItem value={3}>h3. Heading</MenuItem>
                <MenuItem value={4}>h4. Heading</MenuItem>
                <MenuItem value={5}>h5. Heading</MenuItem>
              </Select>
            </FormControl>
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
