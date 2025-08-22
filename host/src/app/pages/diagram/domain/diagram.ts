export type DiagramNodeId = string

type NodeBase = {
  id: DiagramNodeId
}

export type DiagramNode = NodeBase & {
  text: string
  x: number
  y: number
  dependencies: string[]
}

export type Point = { x: number; y: number }
export type ArrowNode = NodeBase & { start: Point; end: Point }

export type Node = DiagramNode | ArrowNode

export const getDependencyNode = (
  nodes: DiagramNode[],
  dependencyId: DiagramNodeId
) => {
  return nodes.find((node) => node.id === dependencyId)
}
