/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Todo } from '../domain/todo'

import { useEffect, useState } from 'react'

const defaultTodos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Master TypeScript' },
  { id: 3, text: 'Build awesome apps' }
]

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos)
  const [selectedTodos, setSelectedTodos] = useState<Record<string, boolean>>(
    {}
  )
  const [userIsAllChecked, setUserIsAllChecked] = useState<boolean>(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTodos((prev) => [...prev, { id: 4, text: 'Master useEffect' }])
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const onTodoToggle = (id: number) => {
    setSelectedTodos((prev) => {
      if (getIsSelected(id)) {
        return { ...prev, [id]: false }
      } else {
        return { ...prev, [id]: true }
      }
    })
  }

  const userUncheckSomeCheckbox = Object.entries(selectedTodos).some(
    ([_, checked]) => checked === false
  )

  const userCheckAllCheckboxes =
    Object.entries(selectedTodos).filter(([_, checked]) => checked === true)
      .length === todos.length

  const isAllChecked =
    userCheckAllCheckboxes || (userIsAllChecked && !userUncheckSomeCheckbox)

  const getIsSelected = (id: number) => {
    return selectedTodos[id] ?? userIsAllChecked
  }

  const toggleAllTodos = () => {
    if (!userIsAllChecked) {
      setUserIsAllChecked(true)
    } else {
      if (userUncheckSomeCheckbox) {
        setSelectedTodos({})
      } else {
        setUserIsAllChecked(false)
        setSelectedTodos({})
      }
    }
  }

  return {
    data: todos,
    isAllChecked,
    onToggle: onTodoToggle,
    toggleAll: toggleAllTodos,
    getIsSelected
  }
}
