/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from '@mui/material'

const GlobalError = ({ status = 404 }: { status: number } | any) => {
  let text = ''
  switch (status) {
    case 404:
      text = 'NOT FOUND. Could not find the resource you are looking for.'
      break
    default:
      text = 'Oops, Something went wrong.'
  }
  return (
    <Box
      textAlign="center"
      marginLeft={'10%'}
      marginTop={'10%'}
      paddingLeft={'20%'}
      paddingRight={'30%'}
    >
      <h1>{text}</h1>
      <Button variant="outlined" href="https://controlrisks.service-now.com/sp">
        Contact us
      </Button>
    </Box>
  )
}

export default GlobalError
