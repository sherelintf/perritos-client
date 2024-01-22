/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'

import SubHeader from '../../components/atoms/subHeader/SubHeader'
import Body from '../../components/molecules/body/Body'

import AddDogForm from '../../components/molecules/addDogForm/AddDogForm'
import { DogContext } from '../../context/DogContext'
function AddDog() {
  const dogContext = useContext(DogContext)

  if (!dogContext) {
    throw new Error('DogPage must be used within a DogContext.Provider')
  }

  const {  clearDog,clearOwner } = dogContext
  const navigate = useNavigate()

  return (
    <>
      <SubHeader>
        <Typography
          variant="caption"
          onClick={() => {
            clearDog()
            clearOwner()
            navigate('/')
          }}
          sx={{ cursor: 'pointer' }}
          fontSize={20}
        >
          <ArrowBackIos
            fontSize="small"
            style={{ verticalAlign: 'middle', fontSize: 15 }}
          />{' '}
          Back to Dashboard
        </Typography>
      </SubHeader>
      <Body>
        <Typography variant="h6">Add a new dog</Typography>
        <AddDogForm />
      </Body>
    </>
  )
}

export default AddDog
