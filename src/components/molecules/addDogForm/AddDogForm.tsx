import { Button as CustomButton } from '../../atoms/buttons/Buttons'
import { useNavigate } from 'react-router-dom'
import Input from '../../atoms/forms/input/Input'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const blApiUrl = process.env.VITE_BL_API_URL

function AddDogForm() {
  const navigate = useNavigate()

  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue('Status', event.target.value)
  }

  const validateSchema = Yup.object({
    DogName: Yup.string().required('Required'),
    Breed: Yup.string().required('Required'),
    Age: Yup.number().required('Required'),
    Status: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      DogName: '',
      Breed: '',
      Age: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const postDog = async () => {
        const response = await fetch(`${blApiUrl}/dogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.DogName,
            breed: values.Breed,
            age: values.Age,
            status: values.Status,
          }),
        })
        const data = await response.json()
        return data.id
      }
      postDog().then((id) => navigate(`/dog/${id}`))
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: '95%', display: 'flex', justifyContent: 'center' }}
    >
      <Stack
        gap={1}
        mt={'20px'}
        padding={'0 300px'}
        justifyContent={'center'}
        alignItems={'center'}
        border={'1px solid #226CA5'}
        borderRadius={'10px'}
        p={'20px'}
        width={'50%'}
        sx={{
          backgroundColor: '#F5F5F5',
        }}
      >
        <Input
          placeholder="Dog Name"
          id="DogName"
          type="text"
          value={formik.values.DogName}
          onChange={formik.handleChange}
          error={formik.touched.DogName && Boolean(formik.errors.DogName)}
          helperText={formik.touched.DogName && formik.errors.DogName}
        />

        <Input
          placeholder="Breed"
          id="Breed"
          type="text"
          value={formik.values.Breed}
          onChange={formik.handleChange}
          error={formik.touched.Breed && Boolean(formik.errors.Breed)}
          helperText={formik.touched.Breed && formik.errors.Breed}
        />

        <Input
          placeholder="Age"
          id="Age"
          type="text"
          value={formik.values.Age}
          onChange={formik.handleChange}
          error={formik.touched.Age && Boolean(formik.errors.Age)}
          helperText={formik.touched.Age && formik.errors.Age}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            value={formik.values.Status}
            onChange={handleChange}
            displayEmpty
            label="Status"
          >
            <MenuItem value={'Adopted'}>
              <em>Adopted</em>
            </MenuItem>
            <MenuItem value={'NotAdopted'}>
              <em>Not Adopted</em>
            </MenuItem>
          </Select>
        </FormControl>
        {formik.errors.Status && formik.touched.Status ? (
          <div
            id="Status-helper-text"
            style={{
              color: '#d32f2f',
              fontSize: '14px',
             alignSelf: 'flex-start',
              marginBottom: '10px',
            }}
          >
            {formik.errors.Status}
          </div>
        ) : null}
        <Stack
          direction={'row'}
          p={'24px'}
          justifyContent={'center'}
          gap={'15px'}
        >
          <CustomButton
            outline
            sx={{
              color: '#226CA5',
              borderColor: '#226CA5',
              minWidth: '150px',
            }}
            onClick={() => navigate('/')}
          >
            Cancel
          </CustomButton>

          <CustomButton
            sx={{
              minWidth: '150px',
            }}
            secondary
            type="submit"
          >
            Save
          </CustomButton>
        </Stack>
      </Stack>
    </form>
  )
}

export default AddDogForm
