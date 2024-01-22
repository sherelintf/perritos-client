import React from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const TextFieldStyled = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'trasparent',
    margin: '5px',
    padding: '0px 5px',
    outline: 'none',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 5px',
    margin: '0px',
    outline: 'none',
  },
  '& .MuiFormHelperText-root': {
    margin: '0px',
    padding: '0px',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: '#000000',
  },
})

function Input({
  placeholder,
  id,
  type,
  value,
  onChange,
  error,
  helperText,
  autoComplete,
  disabled,
}: {
  placeholder: string
  id: string
  type?: 'text' | 'password' | 'number'
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: boolean | undefined
  helperText?: string | false | undefined
  autoComplete?: string
  disabled?: boolean
}) {
  return (
    <>
      <TextFieldStyled
        id={id}
        autoComplete={autoComplete}
        variant="outlined"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        error={error}
        helperText={helperText}
        fullWidth={true}
        disabled={disabled}
      />
    </>
  )
}

export default Input
