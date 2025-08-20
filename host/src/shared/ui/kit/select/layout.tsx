import { useEffect, useRef, useState } from 'react'
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material'

export function Layout<T>(props: {
  options: T[]
  getLabel?: (value: T) => string | number
  onChange?: (value: T) => void
  value?: T
}): React.ReactElement
export function Layout<T, V = T>({
  options,
  getValue = (value: T) => value as never as V,
  getLabel = (value: T) => String(value),
  onChange,
  value
}: {
  options: T[]
  getValue?: (value: T) => V
  getLabel?: (value: T) => string | number
  onChange?: (value: V) => void
  value?: unknown
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((option) =>
    String(getLabel(option)).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedLabel = value
    ? getLabel(options.find((opt) => getValue(opt) === value)!)
    : ''

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          if (filteredOptions[highlightedIndex]) {
            onChange?.(getValue(filteredOptions[highlightedIndex]))
            setIsOpen(false)
            setSearchTerm('')
          }
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchTerm('')
        break
    }
  }

  return (
    <Box
      component='div'
      ref={containerRef}
      onKeyDown={handleKeyDown}
      sx={{ width: '100%', position: 'relative' }}>
      <Button
        fullWidth
        variant='outlined'
        onClick={() => {
          setIsOpen((prev) => !prev)
          if (!isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 0)
          }
        }}
        aria-controls='listbox'
        aria-expanded={isOpen}
        endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
        sx={{
          justifyContent: 'space-between',
          textTransform: 'none',
          color: selectedLabel ? 'text.primary' : 'text.secondary',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
        {selectedLabel || 'Select an option'}
      </Button>

      <Popper
        open={isOpen}
        anchorEl={containerRef.current}
        placement='bottom-start'
        sx={{ zIndex: 1300, width: containerRef.current?.clientWidth }}>
        <Paper
          elevation={3}
          sx={{ width: '100%', maxHeight: 300, overflow: 'hidden' }}>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <InputBase
              inputRef={searchInputRef}
              fullWidth
              placeholder='Search...'
              autoFocus
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setHighlightedIndex(0)
              }}
              sx={{ flex: 1 }}
            />
            {searchTerm && (
              <IconButton
                size='small'
                onClick={() => setSearchTerm('')}
                sx={{ ml: 1 }}>
                <Close fontSize='small' />
              </IconButton>
            )}
          </Box>
          <List sx={{ overflow: 'auto', maxHeight: 250 }}>
            {filteredOptions.map((option, index) => (
              <ListItem
                key={String(getValue(option))}
                disablePadding>
                <ListItemButton
                  selected={getValue(option) === value}
                  onClick={() => {
                    onChange?.(getValue(option))
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor:
                      index === highlightedIndex ? 'action.hover' : 'inherit',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      '&:hover': {
                        bgcolor: 'primary.light'
                      }
                    }
                  }}>
                  <ListItemText primary={getLabel(option)} />
                </ListItemButton>
              </ListItem>
            ))}
            {filteredOptions.length === 0 && (
              <ListItem>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ px: 2, py: 1 }}>
                  No results found
                </Typography>
              </ListItem>
            )}
          </List>
        </Paper>
      </Popper>
    </Box>
  )
}
