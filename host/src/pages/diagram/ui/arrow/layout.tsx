import type { ArrowNode } from '../../domain/diagram'

export function Layout({
  arrow: {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 }
  }
}: {
  arrow: ArrowNode
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke='black'
      strokeWidth='2'
    />
  )
}
