import type { DiagramNode } from './diagram'

export const getFilteredNodes = (
  nodes: DiagramNode[],
  deleteNodeId: string
) => {
  return nodes.filter((node) => node.id !== deleteNodeId)
}
