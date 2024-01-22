import styled from '@emotion/styled'
import { ButtonGroup } from '@mui/material'

export const CustomButtonGroup = styled(ButtonGroup)({
    maxHeight: '40px',
    border: '2px solid #226CA5',
    '& button': {
        borderRight: '2px solid #226CA5 !important',
        color: '#000',
        // borderRight:'none',
        backgroundColor: '#fff',
        textTransform: 'none',
        ':hover':{
            backgroundColor: '#fff',
        },
        '&.active':{
            backgroundColor: '#226CA5',
            color: '#fff',
            fontWeight: 'bold'
        }
    },
    '& button:last-child': {
        borderRight:'none !important' ,
      },
})