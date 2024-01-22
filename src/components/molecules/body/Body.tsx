import { Container, ContainerProps } from '@mui/material'

export default function Body({ children }: ContainerProps) {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          my: 8,
          padding: '30px !important',
          margin: 0,
        }}
      >
        {children}
      </Container>
    </>
  )
}
