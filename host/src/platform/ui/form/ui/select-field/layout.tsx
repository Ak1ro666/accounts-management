import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

import { Simplify } from '@/platform/lib/typescript'

export function Layout<
  IdKey extends string,
  LabelKey extends string,
  Option extends Simplify<
    Record<IdKey, string | number | undefined> & Record<LabelKey, string>
  >
>({
  label,
  name,
  idKey,
  labelKey,
  options,
  value,
  onChangeValue,
  onChange
}: {
  label: string
  idKey: IdKey
  labelKey: LabelKey
  name: string
  options: Option[]
  value: Option[IdKey]
  onChangeValue?: (value: Option[IdKey]) => void
  onChange?: (event: SelectChangeEvent<Option[IdKey]>) => void
}) {
  const handleChange = (event: SelectChangeEvent<Option[IdKey]>) => {
    onChange?.(event)
    onChangeValue?.(event.target.value as Option[IdKey])
  }

  return (
    <FormControl
      fullWidth
      size='small'>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        name={name}>
        {options.map((option) => (
          <MenuItem
            key={option[idKey]}
            value={option[idKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
