import { useState } from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'

export function useDraggbleList<T>({
  list,
  onChangeOrder,
  getId
}: {
  list: T[]
  onChangeOrder: (newOrder: T[]) => void
  getId: (item: T) => number | string
}) {
  const [dragState, setDragState] = useState<{
    draggedId: number | string | null
    draggedOverId: number | string | null
  }>({
    draggedId: null,
    draggedOverId: null
  })

  const handleDragStart = (item: T) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', '')
    e.dataTransfer.effectAllowed = 'move'
    setDragState((prev) => ({
      ...prev,
      draggedId: getId(item)
    }))
  }

  const handleDragEnter = (item: T) => (e: React.DragEvent) => {
    e.preventDefault()
    if (getId(item) !== dragState.draggedId) {
      setDragState((prev) => ({
        ...prev,
        draggedOverId: getId(item)
      }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnd = () => {
    const { draggedId, draggedOverId } = dragState

    if (draggedId !== null && draggedOverId !== null) {
      const draggedTask = list.find((item) => getId(item) === draggedId)
      const draggedOverTask = list.find((item) => getId(item) === draggedOverId)

      if (draggedTask && draggedOverTask) {
        const newList = [...list]
        const draggedIdx = newList.indexOf(draggedTask)
        const draggedOverIdx = newList.indexOf(draggedOverTask)

        newList.splice(draggedIdx, 1)
        newList.splice(draggedOverIdx, 0, draggedTask)

        onChangeOrder(newList)
      }
    }

    setDragState({
      draggedId: null,
      draggedOverId: null
    })
  }

  return {
    getItemProps: (
      item: T,
      {
        className
      }: {
        className?: string
      }
    ) => ({
      draggable: true,
      className: clsx(styles['dnd-item'], className),
      onDragStart: handleDragStart(item),
      onDragEnter: handleDragEnter(item),
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      'data-dragged': getId(item) === dragState.draggedId,
      'data-dragged-over': getId(item) === dragState.draggedOverId
    }),
    getContainerProps: ({ className }: { className?: string }) => ({
      className: clsx(styles['dnd-container'], className)
    })
  }
}
