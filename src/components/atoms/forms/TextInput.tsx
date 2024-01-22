/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportProblem } from '@mui/icons-material'
import { Box, InputLabel, TextField } from '@mui/material'
import { CSSProperties, FC, HTMLProps } from 'react'
export type TextInputProps = HTMLProps<HTMLInputElement> & {
  editable?: boolean
  multiline?: boolean
  onChangeHandler?: any
  variant?: 'standard'
  sx?: CSSProperties
  sxLabel?: CSSProperties
  errorMessage?: string
  hasFallout?: boolean
  limit?: number
  archived?: boolean
  showError?: boolean
  autoComplete?: string
  checkBox?: {
    validate: boolean
    message: string
    onChangeHandler?: any
    isChecked: boolean
  }
}

const TextInput: FC<TextInputProps> = ({
  onChangeHandler,
  onBlur,
  value,
  id,
  sx,
  sxLabel,
  variant,
  name,
  placeholder,
  label,
  multiline,
  errorMessage,
  disabled,
  hasFallout,
  limit,
  archived,

  editable = true,
  type = 'text',
  autoComplete = undefined,
}) => {
  return (
    <Box width={'100%'} position={'relative'}>
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
          sx={{
            color: hasFallout ? '#E83C4E' : undefined,
            fontSize: 12,
            ...sxLabel,
          }}
        >
          {label}
        </InputLabel>
      </Box>
      <TextField
        onBlur={onBlur}
        autoComplete={autoComplete}
        id={id}
        value={value}
        name={name}
        multiline={multiline}
        disabled={disabled}
        type={type}
        fullWidth
        placeholder={placeholder}
        onChange={onChangeHandler}
        variant={variant}
        rows={multiline ? 5 : undefined}
        onWheel={(e) => (e.target as HTMLElement).blur()}
        InputProps={{
          readOnly: !editable,
          disabled: !editable,
          sx: {
            height: !multiline ? 40 : undefined,
            ...sx,
          },
          disableUnderline: true,
        }}
        inputProps={{
          maxLength: limit,
        }}
        sx={{
          padding: 0,
          py: 0,
          border: editable ? undefined : '0px solid #fff',
          background: errorMessage ? '#ff111110' : undefined,
          '& fieldset': {
            padding: !editable ? undefined : 0,
            border: archived ? 'none' : undefined,
          },
          '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
            { WebkitAppearance: 'none' },
          '& input': {
            boxSizing: 'border-box',
            padding: '20px 14px',
            WebkitBoxShadow: '0 0 0 30px white inset',
            paddingLeft: archived ? 0 : '14px',
          },
          '& input.Mui-disabled': {
            color: archived ? '#000000DE' : undefined,
            WebkitTextFillColor: archived ? '#000000DE' : undefined,
          },
          '& textarea.Mui-disabled': {
            color: archived ? '#000000DE' : undefined,
            WebkitTextFillColor: archived ? '#000000DE' : undefined,
          },
          '& svg': { display: archived ? 'none' : undefined },
          '& div': { padding: archived ? '8px 0 0 0' : '' },
        }}
      />
      {value && value.toString().length > 0 && editable && limit && (
        <div
          style={{
            position: 'absolute',
            right: '0.5rem',
            zIndex: 50,
            opacity: '50%',
            fontSize: 'small',
          }}
        >
          {value.toString().length} / {limit}
        </div>
      )}
    </Box>
  )
}

export default TextInput
