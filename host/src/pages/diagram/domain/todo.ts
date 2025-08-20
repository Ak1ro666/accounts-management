/* eslint-disable @typescript-eslint/no-unused-vars */
export type TodoId = number
export type Todo = { id: TodoId; text: string }

export const userUncheckSomeCheckbox = (
  checkboxes: Record<string, boolean>
) => {
  return Object.entries(checkboxes).every(([_, checked]) => checked !== false)
}
