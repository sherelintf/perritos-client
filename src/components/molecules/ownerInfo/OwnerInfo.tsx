import { useEffect, useState, useContext } from 'react'
import { BigBoxContainer } from '../../atoms/bigBoxContainer/styles'
import { IconButton, Paper, Stack, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button as CustomButton } from '../../atoms/buttons/Buttons'
import Input from '../../atoms/forms/input/Input'
import CreateIcon from '@mui/icons-material/Create'
import { Owner } from '../../../types/OwnerType'

import { DogContext } from '../../../context/DogContext'


const blApiUrl = process.env.VITE_BL_API_URL

function OwnerInfo({ owner }: { owner: Owner }) {
  const dogContext = useContext(DogContext)

  if (!dogContext) {
    throw new Error('OwnerInfo must be used within a DogContext.Provider')
  }

  const { dog, setOwner } = dogContext

  const [ownerEdit, setOwnerEdit] = useState<boolean>(false)

 


  const ValidationSchema = Yup.object({
    Name: Yup.string().required('Required'),
    Address: Yup.string(),
    PhoneNumber: Yup.string(),
    Email: Yup.string().email('Invalid email address'),
  })

  const formik = useFormik({
    initialValues: {
      Name: '',
      Address: '',
      PhoneNumber: '',
      Email: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      if (dog.ownerId === '00000000-0000-0000-0000-000000000000') {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }

     
        fetch(`${blApiUrl}/owners`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            fetch(`${blApiUrl}/dogs/${dog.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...dog, ownerId: data.id }),
            })
              .then((response) => response.json())
              .catch((error) => {
                console.log(error)
              })
            setOwner(data)
            setOwnerEdit(false)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: dog.ownerId,
            name: values.Name,
            address: values.Address,
            phoneNumber: values.PhoneNumber,
            email: values.Email,
          }),
        }
        fetch(`${blApiUrl}/owners/${dog.ownerId}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setOwner(data)
            setOwnerEdit(false)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  })

  useEffect(() => {
    if (dog.ownerId !== '00000000-0000-0000-0000-000000000000') {
      formik.setFieldValue('Name', owner.name)
      formik.setFieldValue('Address', owner.address)
      formik.setFieldValue('PhoneNumber', owner.phoneNumber)
      formik.setFieldValue('Email', owner.email)
    }
  }, [owner])

  return (
    <BigBoxContainer>
      {dog.status == 'Adopted' ? (
        <>
          <IconButton
            aria-label="edit"
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              margin: 2,
            }}
            onClick={() => setOwnerEdit(true)}
          >
            {ownerEdit ? null : <CreateIcon />}
          </IconButton>
          <Typography variant="h5">Owner Information</Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack gap={1} width={'80%'}>
              <Input
                placeholder="Owner Name"
                id="Name"
                type="text"
                value={formik.values?.Name}
                onChange={formik.handleChange}
                error={formik.touched.Name && Boolean(formik.errors.Name)}
                helperText={formik.touched.Name && formik.errors.Name}
                disabled={!ownerEdit}
              />
              <Input
                placeholder="Owner Address"
                id="Address"
                type="text"
                value={formik.values?.Address}
                onChange={formik.handleChange}
                error={formik.touched.Address && Boolean(formik.errors.Address)}
                helperText={formik.touched.Address && formik.errors.Address}
                disabled={!ownerEdit}
              />
              <Input
                placeholder="Owner Phone"
                id="PhoneNumber"
                type="text"
                value={formik.values?.PhoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.PhoneNumber &&
                  Boolean(formik.errors.PhoneNumber)
                }
                helperText={
                  formik.touched.PhoneNumber && formik.errors.PhoneNumber
                }
                disabled={!ownerEdit}
              />
              <Input
                placeholder="Owner Email"
                id="Email"
                type="text"
                value={formik.values?.Email}
                onChange={formik.handleChange}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
                disabled={!ownerEdit}
              />
              {ownerEdit ? (
                <Stack direction={'row'} justifyContent={'center'} gap={'15px'}>
                  <CustomButton
                    outline
                    sx={{
                      color: '#226CA5',
                      borderColor: '#226CA5',
                      minWidth: '100px',
                    }}
                    onClick={() => {
                      formik.values.Name = owner.name
                      formik.values.Address = owner.address
                      formik.values.PhoneNumber = owner.phoneNumber
                      formik.values.Email = owner.email

                      formik.setTouched({
                        Name: false,
                        Address: false,
                        PhoneNumber: false,
                        Email: false,
                      })
                      setOwnerEdit(false)
                    }}
                  >
                    Cancel
                  </CustomButton>

                  <CustomButton
                    sx={{
                      minWidth: '100px',
                    }}
                    secondary
                    type="submit"
                  >
                    Save
                  </CustomButton>
                </Stack>
              ) : null}
            </Stack>
          </form>
        </>
      ) : (
        <Paper
          sx={{
            border: '2px solid red',
            mt: '130px',
            padding: '20px',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            selfAlign: 'center',
          }}
        >
          <Typography variant="h4">Owner Information</Typography>

          <Typography variant="body1">
            Change the Dog status to enable the Owner's form
          </Typography>
        </Paper>
      )}
    </BigBoxContainer>
  )
}

export default OwnerInfo
