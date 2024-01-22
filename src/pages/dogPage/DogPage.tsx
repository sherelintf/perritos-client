/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Stack } from '@mui/material'
import Body from '../../components/molecules/body/Body'
import { ArrowBackIos } from '@mui/icons-material'
import SubHeader from '../../components/atoms/subHeader/SubHeader'
import DogInfo from '../../components/molecules/dogInfo/DogInfo'
import OwnerInfo from '../../components/molecules/ownerInfo/OwnerInfo'

import { DogContext } from '../../context/DogContext'

const blApiUrl = process.env.VITE_BL_API_URL

function DogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dogContext = useContext(DogContext)

  if (!dogContext) {
    throw new Error('DogPage must be used within a DogContext.Provider')
  }

  const { dog, setDog, clearDog, owner, setOwner, clearOwner } = dogContext

  const getDog = useCallback(async () => {
    const response = await fetch(`${blApiUrl}/dogs/${id}`)
    const data = await response.json()
    return data
  }, [id])

  useEffect(() => {
    getDog().then((data) => {
      setDog(data)
    })
  }, [id])

  const getOwner = useCallback(async () => {
    const response = await fetch(`${blApiUrl}/owners/${dog.ownerId}`)
    const data = await response.json()
    return data
  }, [dog])

  useEffect(() => {
    if (dog.ownerId) {
      getOwner()
        .then((data) => {
          setOwner(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dog])

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
          <ArrowBackIos /> Back to Dashboard
        </Typography>
      </SubHeader>

      <Body>
        <Stack gap={2}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            gap={2}
            alignItems={'center'}
          >
            <DogInfo dog={dog} />
            <OwnerInfo owner={owner} />
          </Stack>
          {dog.imageUrl && (
            <img
              src={dog.imageUrl}
              alt="dog"
              style={{
                width: '500px',

                alignSelf: 'center',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
              }}
            />
          )}
        </Stack>
      </Body>
    </>
  )
}

export default DogPage
