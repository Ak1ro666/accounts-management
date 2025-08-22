import type { DiagramNode } from '../../domain/diagram'

import { RefObject } from 'react'

import { useHtmlNodeReader } from '../../view-model/use-html-node-reader'

export function Layout({
  node,
  onDelete,
  nodeRef
}: {
  node: DiagramNode
  onDelete: (id: string) => void
  nodeRef: RefObject<Map<string, HTMLDivElement>>
}) {
  const htmlNodeReader = useHtmlNodeReader(nodeRef, node.id)

  return (
    <div
      key={node.id}
      ref={htmlNodeReader}
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        maxWidth: '300px',

        backgroundColor: '#e0e0e0',
        border: '2px solid black',
        padding: 5
      }}>
      <div> {node.text}</div>
      <div>
        <button onClick={() => onDelete(node.id)}>Delete</button>
      </div>
    </div>
  )
}
