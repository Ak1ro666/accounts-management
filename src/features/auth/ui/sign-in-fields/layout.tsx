import type { SignInErrors, SignInFormData } from '../../domain/types'

import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField
} from '@mui/material'

export function Layout({
  formData,
  onChange,
  errors
}: {
  formData: SignInFormData
  onChange: (name: string, value: string | boolean) => void
  errors?: SignInErrors
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      onChange(e.target.name, e.target.checked)
    } else {
      onChange(e.target.name, e.target.value)
    }
  }

  return (
    <>
      <TextField
        label='Email'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.email}
        name='email'
        onChange={handleChangeField}
        error={!!errors?.email}
        helperText={errors?.email}
        type='email'
      />

      <TextField
        label='Пароль'
        variant='outlined'
        fullWidth
        margin='normal'
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        name='password'
        onChange={handleChangeField}
        error={!!errors?.password}
        helperText={errors?.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              name='rememberMe'
              onChange={handleChangeField}
            />
          }
          label='Запомнить меня'
        />

        <Link variant='body2'>Забыли пароль?</Link>
      </Box>
    </>
  )
}
