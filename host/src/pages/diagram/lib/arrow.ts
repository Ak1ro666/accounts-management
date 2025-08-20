import { ArrowNode, Point } from '../domain/diagram'

export const shiftArrow = (
  { start, end, id }: ArrowNode,
  startNode: HTMLDivElement,
  endNode: HTMLDivElement
) => {
  const startRect = startNode.getBoundingClientRect()
  const endRect = endNode.getBoundingClientRect()

  let newStart: Point, newEnd: Point

  if (startRect.right < endRect.left) {
    newStart = {
      x: start.x + startRect.width,
      y: start.y + startRect.height / 2
    }
    newEnd = { x: end.x, y: end.y + endRect.height / 2 }
  } else if (startRect.left > endRect.right) {
    newStart = { x: start.x, y: start.y + startRect.height / 2 }
    newEnd = { x: end.x + endRect.width, y: end.y + endRect.height / 2 }
  } else if (startRect.bottom < endRect.top) {
    newStart = {
      x: start.x + startRect.width / 2,
      y: start.y + startRect.height
    }
    newEnd = { x: end.x + endRect.width / 2, y: end.y }
  } else {
    newStart = { x: start.x + startRect.width / 2, y: start.y }
    newEnd = { x: end.x + endRect.width / 2, y: end.y + endRect.height }
  }

  return { id, start: newStart, end: newEnd }
}
