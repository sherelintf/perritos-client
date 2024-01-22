import React, { CSSProperties } from 'react'
import { Paper, IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'



type SearchInputProps = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
  sx?: CSSProperties
  errorMessage?: string
  value?: string
}

export default function SearchInput({
  onChange,
  placeholder,
  sx,
  value,
}: SearchInputProps) {
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          boxShadow: 'none',
          border: '1px solid #CACDCD',
          maxWidth: '380px',
          ...sx,
        }}
      >
        <IconButton type="button" sx={{ padding: '8px' }} aria-label="search">
          <Search />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            width: '100%',
          }}
          value={value}
          placeholder={placeholder ? placeholder : 'Search dog by his name'}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            onChange(e)
          }}
        />
      </Paper>
    </>
  )
}
