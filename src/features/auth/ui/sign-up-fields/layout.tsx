import { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";

import type { SignUpErrors, SignUpFormData } from "../../domain/types";

export function Layout({
  formData,
  onChange,
  errors,
}: {
  formData: SignUpFormData;
  onChange: (name: string, value: string | boolean) => void;
  errors?: SignUpErrors;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      onChange(e.target.name, e.target.checked);
    } else {
      onChange(e.target.name, e.target.value);
    }
  };

  return (
    <>
      <TextField
        label="Имя"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.name}
        name="name"
        onChange={handleChangeField}
        error={!!errors?.name}
        helperText={errors?.name}
        type="text"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        name="email"
        onChange={handleChangeField}
        error={!!errors?.email}
        helperText={errors?.email}
        type="email"
      />

      <TextField
        label="Пароль"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        name="password"
        onChange={handleChangeField}
        error={!!errors?.password}
        helperText={errors?.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Подтверждение пароля"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        name="confirmPassword"
        onChange={handleChangeField}
        error={!!errors?.confirmPassword}
        helperText={errors?.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              name="rememberMe"
              onChange={handleChangeField}
            />
          }
          label="Запомнить меня"
        />

        <Link variant="body2">Забыли пароль?</Link>
      </Box>
    </>
  );
}
