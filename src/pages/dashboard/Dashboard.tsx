/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material'
import { Button as CustomButton } from '../../components/atoms/buttons/Buttons'

import Body from '../../components/molecules/body/Body'
import DogsTable from '../../components/molecules/dogTable/DogTable'
import { ControlPointRounded } from '@mui/icons-material'

import { Link } from 'react-router-dom'

import SubHeader from '../../components/atoms/subHeader/SubHeader'

const Dashboard = () => {
  return (
    <>
      <SubHeader>
        <Typography variant="h5">Perritos Portal</Typography>

        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={'/add-dog'}
          id="addDogLink"
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CustomButton
              secondary
              sx={{
                textAlign: 'right',
                width: '180px',
                fontSize: '15px',
                padding: '10px',
                minHeight: '42px',
                margin: '0',
              }}
            >
              <ControlPointRounded />
              Add a Dog
            </CustomButton>
          </div>
        </Link>
      </SubHeader>

      <Body>
        <Box>
          <DogsTable />
        </Box>
      </Body>
    </>
  )
}

export default Dashboard
