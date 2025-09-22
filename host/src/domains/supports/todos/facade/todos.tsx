import { ALL_CHECKED_TODO } from '../lib/todo'
import { useTodos } from '../model/use-todos'
import { CheckboxTodo } from '../ui/checkbox-todo'
import { TodosRoot } from '../ui/todos-root'

export function Todos() {
  const todos = useTodos()

  return (
    <TodosRoot
      content={
        <>
          <CheckboxTodo
            checked={todos.isAllChecked}
            onChange={todos.toggleAll}
            todo={ALL_CHECKED_TODO}
          />
          {todos.data.map((todo) => (
            <CheckboxTodo
              key={todo.id}
              todo={todo}
              checked={todos.getIsSelected(todo.id)}
              onChange={() => todos.onToggle(todo.id)}
            />
          ))}
        </>
      }
    />
  )
}
