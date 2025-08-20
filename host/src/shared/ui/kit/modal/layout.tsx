import {
  AppBar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Toolbar
} from '@mui/material'

export function Layout({
  title,
  body,
  header,
  footer,
  actions,
  ...otherProps
}: {
  title?: string
  body?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  actions?: React.ReactNode
  onClose?: () => void
} & DialogProps) {
  return (
    <Dialog
      data-testid='modal'
      maxWidth='md'
      {...otherProps}>
      {header && (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>{header}</Toolbar>
        </AppBar>
      )}
      {title && <DialogTitle data-testid='title'>{title}</DialogTitle>}
      <Box component='form'>
        <DialogContent>
          {body}
          {footer}
        </DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Box>
    </Dialog>
  )
}
