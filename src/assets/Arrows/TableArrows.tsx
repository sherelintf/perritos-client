import React from 'react'
import {CSSProperties} from '@emotion/serialize'
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material'

type Props = {
  sx?: CSSProperties
}

export const UpArrow = ({sx}: Props) => {
  return (
    <ArrowDropUp sx={{color: 'white', width: '30px', heigth: '30px', ...sx}} />
  )
}

export const DownArrow = ({sx}: Props) => {
  return (
    <ArrowDropDown
      sx={{color: 'white', width: '30px', heigth: '30px', ...sx}}
    />
  )
}
