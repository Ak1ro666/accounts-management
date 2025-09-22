import type { DiagramNode } from '../domain/diagram'

import { Arrow } from '../ui/arrow'
import { DiagramNodeView } from '../ui/diagram-node-view'
import { Root } from '../ui/root'
import { useArrows } from '../view-model/use-arrows'

import { Timer } from '@/domains/supports/timer'
import { Todos } from '@/domains/supports/todos'

export function Diagram({
  nodes,
  onDeleteNode
}: {
  nodes: DiagramNode[]
  onDeleteNode: (id: string) => void
}) {
  const arrows = useArrows({ nodes })

  return (
    <Root
      arrows={arrows.data.map((arrow) => (
        <Arrow
          key={arrow.id}
          arrow={arrow}
        />
      ))}
      content={nodes.map((node) => (
        <DiagramNodeView
          key={node.id}
          nodeRef={arrows.nodeRef}
          node={node}
          onDelete={onDeleteNode}
        />
      ))}
      centerActionsPannel={
        <>
          <Todos />
          <Timer />
        </>
      }
    />
  )
}
