import type { Account, AccountStatus } from '../../../domain/account'
import type { FormData, FormErrors } from '../../../domain/form'

import { ChangeEvent, ReactNode } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'

import { UiLoader } from '@/shared/ui/kit/loader'

import { getCreationDate } from '../../../domain/form'

export function Layout({
  formData,
  errors,
  onChange,
  account,
  isLoading,
  tabs
}: {
  formData: FormData
  errors?: FormErrors
  onChange: (name: string, value: string) => void
  account?: Account
  isLoading: boolean
  tabs: ReactNode
}) {
  const onChangeField = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<AccountStatus>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      onChange(e.target.name, e.target.value)
    } else {
      onChange(e.target.name, e.target.value)
    }
  }

  return (
    <Grid
      container
      spacing={2}>
      {isLoading ? (
        <UiLoader />
      ) : (
        <>
          <Grid
            size={{ xs: 12, sm: 6 }}
            mt={1}>
            <TextField
              name='code'
              label='Код счета'
              value={formData.code}
              onChange={onChangeField}
              fullWidth
              required
              disabled
            />
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6 }}
            mt={1}>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                name='status'
                value={formData.status}
                onChange={onChangeField}
                label='Статус'>
                <MenuItem value='OPEN'>Открыт</MenuItem>
                <MenuItem value='PRE_CLOSED'>Предзакрыт</MenuItem>
                <MenuItem value='CLOSED'>Закрыт</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name='owner'
              label='Владелец'
              value={formData.owner}
              onChange={onChangeField}
              fullWidth
              required
              error={!!errors?.owner}
              helperText={errors?.owner}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name='address'
              label='Адрес'
              value={formData.address}
              onChange={onChangeField}
              fullWidth
              required
              error={!!errors?.address}
              helperText={errors?.address}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label='Дата создания'
              value={getCreationDate(account)}
              fullWidth
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label='Задолженность'
              value={`${(account?.debt ?? 0).toFixed(2)} ₽`}
              fullWidth
              disabled
            />
          </Grid>
        </>
      )}
      {tabs}
    </Grid>
  )
}
