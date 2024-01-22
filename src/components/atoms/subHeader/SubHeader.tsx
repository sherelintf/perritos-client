import * as React from 'react'
import { Stack } from '@mui/material'

export interface ISubHeaderProps {
  children: React.ReactNode
}

export default function SubHeader(props: ISubHeaderProps) {
  const { children } = props

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={'10px'}
      bgcolor={'#fff'}
      height={'60px'}
    >
      {children}
    </Stack>
  )
}
