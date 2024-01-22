import { Paper } from '@mui/material'
import styled from '@emotion/styled'

export const BigBoxContainer = styled(Paper)({
  width: '50%',
  height: '400px',
  paddingTop: 20,
  paddingBottom: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '10px',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  position: 'relative',
})
