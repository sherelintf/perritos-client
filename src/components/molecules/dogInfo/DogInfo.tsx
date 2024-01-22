import { useEffect, useState, useContext } from 'react'
import { BigBoxContainer } from '../../atoms/bigBoxContainer/styles'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button as CustomButton } from '../../atoms/buttons/Buttons'
import Input from '../../atoms/forms/input/Input'
import CreateIcon from '@mui/icons-material/Create'
import { DogContext } from '../../../context/DogContext'
import { Dog } from '../../../types/DogType'

const blApiUrl = process.env.VITE_BL_API_URL

function DogInfo({ dog }: { dog: Dog }) {
  const dogContext = useContext(DogContext)

  if (!dogContext) {
    throw new Error('DogInfo must be used within a DogContext.Provider')
  }

  const { setDog } = dogContext
  const [dogEdit, setDogEdit] = useState<boolean>(false)
  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue('Status', event.target.value)
  }

  const validationSchema = Yup.object({
    DogName: Yup.string().required('Required'),
    Breed: Yup.string().required('Required'),
    Age: Yup.number()
      .required('Required')
      .positive()
      .integer()
      .typeError('Age must be a number'),
    Status: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      DogName: '',
      Breed: '',
      Age: 0,
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const putDog = async () => {
        const response = await fetch(`${blApiUrl}/dogs/${dog.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: dog.id,
            name: values.DogName,
            breed: values.Breed,
            age: values.Age,
            status: values.Status,
          }),
        })
        const data = await response.json()
        return data
      }
      putDog()
        .then((data) => {
          setDog(data)
          setDogEdit(false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  })

  useEffect(() => {
    formik.setFieldValue('DogName', dog.name)
    formik.setFieldValue('Breed', dog.breed)
    formik.setFieldValue('Age', dog.age)
    formik.setFieldValue('Status', dog.status)
  }, [dog])

  return (
    <BigBoxContainer>
      <IconButton
        aria-label="edit"
        id="editDogInfo"
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          margin: 2,
        }}
        onClick={() => setDogEdit(true)}
      >
        {dogEdit ? null : <CreateIcon />}
      </IconButton>
      <Typography variant="h5">Dogs information</Typography>
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
            placeholder="Dog Name"
            id="DogName"
            type="text"
            value={formik.values?.DogName}
            onChange={formik.handleChange}
            error={formik.touched.DogName && Boolean(formik.errors.DogName)}
            helperText={formik.touched.DogName && formik.errors.DogName}
            disabled={!dogEdit}
          />
          <Input
            placeholder="Breed"
            id="Breed"
            type="text"
            value={formik.values?.Breed}
            onChange={formik.handleChange}
            error={formik.touched.Breed && Boolean(formik.errors.Breed)}
            helperText={formik.touched.Breed && formik.errors.Breed}
            disabled={!dogEdit}
          />
          <Input
            placeholder="Age"
            id="Age"
            type="text"
            value={formik.values?.Age}
            onChange={formik.handleChange}
            error={formik.touched.Age && Boolean(formik.errors.Age)}
            helperText={formik.touched.Age && formik.errors.Age}
            disabled={!dogEdit}
          />

          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              name="Status"
              labelId="status-label"
              id="Status"
              value={formik.values?.Status ? formik.values.Status : ''}
              onChange={handleChange}
              label="Status"
              disabled={!dogEdit}
              displayEmpty
            >
              <MenuItem value={'Adopted'}>Adopted</MenuItem>
              <MenuItem value={'NotAdopted'}>Not Adopted</MenuItem>
            </Select>
          </FormControl>
          {formik.errors.Status && formik.touched.Status ? (
            <div
              style={{
                color: '#d32f2f',
                fontSize: '14px',
                textAlign: 'left',
                marginBottom: '10px',
              }}
            >
              {formik.errors.Status}
            </div>
          ) : null}

          {dogEdit ? (
            <Stack direction={'row'} justifyContent={'center'} gap={'15px'}>
              <CustomButton
                outline
                sx={{
                  color: '#226CA5',
                  borderColor: '#226CA5',
                  minWidth: '100px',
                }}
                onClick={() => {
                  formik.setFieldValue('DogName', dog.name)
                  formik.setFieldValue('Breed', dog.breed)
                  formik.setFieldValue('Age', dog.age)
                  formik.setFieldValue('Status', dog.status)

                  formik.setTouched({
                    DogName: false,
                    Breed: false,
                    Age: false,
                    Status: false,
                  })
                  setDogEdit(false)
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
    </BigBoxContainer>
  )
}

export default DogInfo
