import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const CustomLink = styled(Link)({
  textDecoration: 'none',
  color: '#000',
  ':hover': {
    textDecoration: 'underline',
  },
})

