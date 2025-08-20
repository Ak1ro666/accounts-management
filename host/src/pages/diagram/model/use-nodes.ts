import { useState } from 'react'

import { DiagramNode } from '../domain/diagram'
import { getFilteredNodes } from '../domain/nodes'

const initialState = [
  {
    id: '1',
    text: 'Block 1 ith long text text',
    x: 50,
    y: 50,
    dependencies: ['2', '3']
  },
  {
    id: '2',
    text: 'Block 2',
    x: 220,
    y: 300,
    dependencies: ['3']
  },
  {
    id: '3',
    text: 'Block 3 wow',
    x: 350,
    y: 50,
    dependencies: []
  },
  {
    id: '4',
    text: 'Block 4',
    x: 500,
    y: 200,
    dependencies: ['1', '3']
  }
]

export function useNodes() {
  const [nodes, setNodes] = useState<DiagramNode[]>(initialState)

  const onDeleteNode = (id: string) => {
    const filteredNode = getFilteredNodes(nodes, id)
    setNodes(filteredNode)
  }

  return [nodes, onDeleteNode] as const
}
