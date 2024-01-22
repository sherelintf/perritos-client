/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, FC } from 'react'
import {
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import { ReportProblem } from '@mui/icons-material'

type SelectOption = { label: string; value: string | number }

export interface SelectInputProps {
  editable?: boolean
  value: string
  options: SelectOption[]
  disabled?: boolean
  label?: string
  name: string
  onChangeHandler: any
  variant?: 'standard' | 'filled' | 'outlined'
  sx?: CSSProperties
  id?: string
  errorMessage?: string
  showError?: boolean
  hasFallout?: boolean
  placeholder?: string
  archived?: boolean
  autocompleteType?: boolean
  checkBox?: {
    validate: boolean
    message: string
    onChangeHandler?: any
    isChecked: boolean
  }
}

const SelectInput: FC<SelectInputProps> = ({
  value,
  options,
  disabled,
  label,
  name,
  onChangeHandler,
  variant,
  sx,
  id,
  placeholder,
  errorMessage,
  hasFallout,
  archived,
  editable = true,

  autocompleteType = false,
}) => {
  return (
    <Box width="100%">
      {!placeholder && (
        <Box display="flex" gap={0} alignItems="center">
          {hasFallout && (
            <ReportProblem
              style={{
                fontSize: '14px',
                verticalAlign: 'top',
                marginRight: '5px',
                color: '#E83C4E',
              }}
            />
          )}
          <InputLabel
            sx={{ color: hasFallout ? '#E83C4E' : undefined, fontSize: 12 }}
          >
            {label}
          </InputLabel>
        </Box>
      )}
      {autocompleteType ? (
        <FormControl
          variant={variant || 'standard'}
          disabled={!editable}
          fullWidth
        >
          <Autocomplete
            defaultValue={
              options.find((option) => option.value === value) || null
            }
            value={options.find((option) => option.value === value) || null}
            onChange={(e, newValue) => {
              onChangeHandler(id, newValue?.value)
            }}
            id={id}
            componentName={id}
            options={options}
            disabled={!editable}
            sx={{
              ...sx,
              borderColor: errorMessage ? 'red' : undefined,
              background: errorMessage
                ? '#ff111110'
                : !editable
                ? '#eee'
                : undefined,
              '& fieldset': {
                padding: editable ? undefined : 0,
                border: archived ? 'none' : undefined,
              },
              '& div': {
                WebkitBoxShadow: '0 0 0 30px white inset',
              },
              '& input.Mui-disabled': {
                color: archived ? '#000000DE' : undefined,
                WebkitTextFillColor: archived ? '#000000DE' : undefined,
                paddingLeft: archived ? '0 !important' : '14px !important',
              },

              '& svg': { display: archived ? 'none' : undefined },
              '& .MuiInputBase-root': { padding: '1px !important' },
              '& .MuiAutocomplete-input': {
                paddingLeft: '14px !important',
              },
            }}
            aria-autocomplete="none"
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </FormControl>
      ) : (
        <FormControl
          variant={variant || 'standard'}
          disabled={disabled}
          fullWidth
          sx={sx}
        >
          {placeholder && !value && (
            <InputLabel
              sx={{
                color: 'grey',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontWeight: 400,
                fontSize: '1.4rem',
                opacity: 0.6,
              }}
            >
              {placeholder}
            </InputLabel>
          )}
          <Select
            id={id}
            name={name}
            value={value}
            variant={'outlined'}
            onChange={onChangeHandler}
            readOnly={!editable}
            disabled={!editable}
            fullWidth
            inputProps={{
              sx: {
                padding: 1,
                height: 40,
              },
            }}
            sx={{
              ...sx,
              borderColor: errorMessage ? 'red' : undefined,
              background: errorMessage
                ? '#ff111110'
                : !editable
                ? '#eee'
                : undefined,
              '& fieldset': {
                padding: editable ? undefined : 0,
                border: archived ? 'none' : undefined,
              },
              '& div': {
                WebkitBoxShadow: '0 0 0 30px white inset',
                paddingLeft: archived ? 0 : '14px',
              },
              '& div.Mui-disabled': {
                color: archived ? '#000000DE' : undefined,
                WebkitTextFillColor: archived ? '#000000DE' : undefined,
              },
              '& input': {
                paddingLeft: archived ? 0 : '14px',
              },
              '& svg': { display: archived ? 'none' : undefined },
            }}
          >
            {options.map(({ label, value }) => (
              <MenuItem key={value + label} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}

export default SelectInput
