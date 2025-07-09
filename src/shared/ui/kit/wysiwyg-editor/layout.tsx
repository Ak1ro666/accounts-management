import {
  createContext,
  RefObject,
  use,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react'
import { Box, Button, Paper } from '@mui/material'

type Command = 'bold' | 'italic' | 'underline' | 'strikethrough'

type WysiwygMethods = {
  getHTML: () => string
  setHTML: (html: string) => void
}

const WysiwygContext = createContext<RefObject<WysiwygMethods> | null>(null)

export function WysiwygProvider({ children }: { children?: React.ReactNode }) {
  return (
    <WysiwygContext.Provider
      value={useRef<WysiwygMethods>({
        getHTML: () => '',
        setHTML: () => {}
      })}>
      {children}
    </WysiwygContext.Provider>
  )
}

export function useWysiwyg() {
  const methodsRef = use(WysiwygContext)
  if (!methodsRef) {
    throw new Error('useWysiwyg must be used within a WysiwygProvider')
  }
  return {
    setHTML: (html: string) => methodsRef.current.setHTML(html),
    getHTML: () => methodsRef.current.getHTML()
  }
}

export function Layout({
  initialContent,
  onChange
}: {
  initialContent: string
  onChange: (content: string) => void
}) {
  const methodsRef = use(WysiwygContext)

  const editorRef = useRef<HTMLDivElement>(null)

  const execCommand = (command: Command) => {
    document.execCommand(command, false)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const isCommandActive = (command: Command): boolean => {
    return document.queryCommandState(command)
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const ref = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.innerHTML = initialContent
    }
    editorRef.current = el
  }, [])

  useImperativeHandle(
    methodsRef,
    () => ({
      getHTML: () => editorRef.current?.innerHTML || '',
      setHTML: (html: string) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = html
          onChange(html)
        }
      }
    }),
    []
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Button
          variant={isCommandActive('bold') ? 'contained' : 'outlined'}
          onClick={() => execCommand('bold')}
          title='Bold'>
          B
        </Button>
        <Button
          variant={isCommandActive('italic') ? 'contained' : 'outlined'}
          onClick={() => execCommand('italic')}
          title='Italic'>
          I
        </Button>
        <Button
          variant={isCommandActive('underline') ? 'contained' : 'outlined'}
          onClick={() => execCommand('underline')}
          title='Underline'>
          U
        </Button>
        <Button
          variant={isCommandActive('strikethrough') ? 'contained' : 'outlined'}
          onClick={() => execCommand('strikethrough')}
          title='Strikethrough'>
          S
        </Button>
      </Box>
      <Paper
        variant='outlined'
        ref={ref}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        sx={{
          p: 2,
          minHeight: 200,
          outline: 'none',
          '&:focus': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 1px primary.main'
          }
        }}
      />
    </Box>
  )
}
