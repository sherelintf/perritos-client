import styled from '@emotion/styled'
import { Container } from '@mui/material'

export const StyledFooter = styled(Container)(() => ({
  display: 'flex',
  background: '#003d50',
  color: '#fff',
  bottom: 0,
  height: '64px',
}))

export const StyledLeftText = styled.p``
export const StyledRightText = styled.p`
  text-align: right;
  a {
    text-decoration: none;
    color: #8dd5d2;
  }
`
