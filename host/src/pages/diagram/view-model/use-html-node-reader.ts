import type { DiagramNodeId } from '../domain/diagram'

import { RefObject, useCallback } from 'react'

export function useHtmlNodeReader(
  nodeRef: RefObject<Map<string, HTMLDivElement>>,
  nodeId: DiagramNodeId
) {
  const createCallbackRef = useCallback(
    (htmlNode: HTMLDivElement | null) => {
      if (htmlNode) {
        nodeRef.current.set(nodeId, htmlNode)
      } else {
        nodeRef.current.delete(nodeId)
      }
    },
    [nodeId, nodeRef]
  )

  return createCallbackRef
}
