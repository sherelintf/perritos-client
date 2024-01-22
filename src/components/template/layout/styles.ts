import { Box } from '@mui/material'
import styled from '@emotion/styled'

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledBodyWrapper = styled(Box)`
  height: 100vh;
  background-repeat: no-repeat;
  background-color: rgba(4, 46, 66, 0.09);
  background: linear-gradient(
    180deg,
    rgba(4, 46, 66, 0.2) 0.02%,
    rgba(255, 255, 255, 1) 99.86%
  );
`
