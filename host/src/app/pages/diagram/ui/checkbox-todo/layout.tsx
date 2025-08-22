import type { Todo } from '../../domain/todo'

import { Checkbox, FormControlLabel, ListItem } from '@mui/material'

export function Layout({
  todo,
  checked,
  onChange
}: {
  todo: Todo
  checked: boolean
  onChange: () => void
}) {
  return (
    <ListItem
      key={todo.id}
      disablePadding>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
          />
        }
        label={todo.text}
        sx={{
          textDecoration: checked ? 'line-through' : 'none'
        }}
      />
    </ListItem>
  )
}
