import { StyledFooter, StyledLeftText, StyledRightText } from './styles'
import { Stack } from '@mui/material'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter maxWidth={false}>
      <Stack direction="row" justifyContent={'space-between'} width={'100%'}>
        <StyledLeftText>{`© Control Risks ${currentYear}.`}</StyledLeftText>
        <StyledRightText>
          <a
            href="https://www.controlrisks.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            controlrisks.com
          </a>
        </StyledRightText>
      </Stack>
    </StyledFooter>
  )
}
