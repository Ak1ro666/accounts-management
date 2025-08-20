import { Box } from '@mui/material'

import { Diagram } from './facade/diagram'
import { useNodes } from './model/use-nodes'

function Page() {
  const [nodes, deleteNode] = useNodes()

  return (
    <Box>
      <Diagram
        nodes={nodes}
        onDeleteNode={deleteNode}
      />
    </Box>
  )
}

export const Component = Page
