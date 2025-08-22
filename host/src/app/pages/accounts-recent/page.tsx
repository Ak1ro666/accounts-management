import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'

import { UiWysiwigEditor, useWysiwyg } from '@/platform/ui/wysiwyg-editor'

function Page() {
  const [content, setContent] = useState(
    '<div>Some text</div><div><strong>Some bold text</strong></div>'
  )
  const wysiwygMethods = useWysiwyg()

  return (
    <Box sx={{ width: '100%', flexGrow: 1, height: '100%' }}>
      <UiWysiwigEditor
        initialContent={content}
        onChange={setContent}
      />
      <button onClick={() => wysiwygMethods.setHTML('')}>Reset</button>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant='h6'>HTML Output:</Typography>
        <Paper
          variant='outlined'
          sx={{
            p: 2,
            backgroundColor: 'grey.100',
            borderRadius: 1,
            fontSize: '0.875rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            fontFamily: 'monospace'
          }}>
          {content}
        </Paper>
      </Box>
    </Box>
  )
}

export const Component = Page
