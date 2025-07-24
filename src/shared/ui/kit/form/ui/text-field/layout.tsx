import { ChangeEvent } from 'react'
import { TextField } from '@mui/material'

export function Layout({
  label,
  value,
  onChangeValue,
  onChange
}: {
  label: string
  value: string
  onChangeValue?: (value: string) => void
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(event)
    onChangeValue?.(event.target.value)
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      fullWidth
      size='small'
    />
  )
}
