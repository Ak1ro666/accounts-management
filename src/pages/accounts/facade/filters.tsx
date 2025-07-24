import { Autocomplete, Box, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { UiSelectField } from '@/shared/ui/kit/form/ui/select-field'
import { UiTextField } from '@/shared/ui/kit/form/ui/text-field'

import { SELECT_FILTERS } from '../lib/constants'
import { useFilters } from '../model/use-filters'
import { FilteredActions } from '../ui/filtered-actions'
import { FiltersLayout } from '../ui/filters-layout'
import { GridLayout } from '../ui/grid-layout'
import { useChangeField } from '../view-model/use-change-field'

export function Filters({ ownerOptions }: { ownerOptions: string[] }) {
  const filters = useFilters()
  const handleChangeField = useChangeField(filters.onChangeFilters)

  return (
    <FiltersLayout renderChild={(child) => <GridLayout>{child}</GridLayout>}>
      <UiTextField
        label='Код счета'
        value={filters.data.code}
        onChangeValue={handleChangeField('code')}
      />

      <UiSelectField
        label='Статус'
        name='status'
        value={filters.data.status}
        idKey='value'
        labelKey='label'
        onChangeValue={handleChangeField('status')}
        options={SELECT_FILTERS}
      />

      <Autocomplete
        freeSolo
        options={ownerOptions}
        inputValue={filters.data.owner}
        onInputChange={(_, newValue) =>
          filters.onChangeFilters('owner', newValue)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label='Владелец'
            size='small'
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label='Дата с'
          value={filters.data.from ? new Date(filters.data.from) : null}
          onChange={(value) =>
            filters.onChangeFilters('from', value?.toString() ?? '')
          }
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label='Дата по'
          value={filters.data.to ? new Date(filters.data.to) : null}
          onChange={(value) =>
            filters.onChangeFilters('to', value?.toString() ?? '')
          }
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />
      </LocalizationProvider>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <FilteredActions
          onResetClick={filters.reset}
          onSearchClick={filters.startSearch}
        />
      </Box>
    </FiltersLayout>
  )
}
