import type { ArrowNode, DiagramNode } from '../domain/diagram'

import { useLayoutEffect, useRef, useState } from 'react'

import { getDependencyNode, shiftArrow } from '../domain/diagram'

export function useArrows({ nodes }: { nodes: DiagramNode[] }) {
  const nodeRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const [arrows, setArrows] = useState<ArrowNode[]>([])

  useLayoutEffect(() => {
    const arrows: ArrowNode[] = []
    nodes.forEach((node) => {
      const { x: x1, y: y1, dependencies } = node

      dependencies.forEach((dependencyId) => {
        const dependencyNode = getDependencyNode(nodes, dependencyId)
        if (dependencyNode) {
          const startNode = nodeRef.current.get(node.id)
          const endNode = nodeRef.current.get(dependencyNode.id)

          if (dependencyNode && startNode && endNode) {
            const { x: x2, y: y2 } = dependencyNode
            arrows.push(
              shiftArrow(
                {
                  start: {
                    x: x1,
                    y: y1
                  },
                  end: {
                    x: x2,
                    y: y2
                  },
                  id: `${node.id}-${dependencyId}`
                },
                startNode,
                endNode
              )
            )
          }
        }
      })
    })

    setArrows(arrows)
  }, [nodes])

  return {
    data: arrows,
    nodeRef
  }
}
