/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  Stack,
  Popover,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Select,
  InputLabel,
} from '@mui/material'
import { headings } from '../../../utils/constants'
import { CustomLink } from './styles'
import { Button as CustomButton } from '../../atoms/buttons/Buttons'
import CommonModal from '../commonModal/CommonModal'
import SearchInput from '../../../components/atoms/searchInput/SearchInput'
import Ellipsis from '../../atoms/ellipsis/Ellipsis'
import { ModalOptions } from '../../../types/enums'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Dog } from '../../../types/DogType'

function EnhancedTableHead() {
  return (
    <TableHead
      sx={{
        backgroundColor: `#053747`,
      }}
    >
      <TableRow>
        {headings.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={false}
            sx={{
              color: '#fff',
              '& .Mui-active ': {
                color: '#fff',
              },
              '& .Mui-active .MuiTableSortLabel-icon': {
                color: '#fff',
              },
              '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active':
                {
                  color: '#fff',
                },
              '& .MuiTableSortLabel-icon': {
                color: '#fff',
              },
              '& .MuiButtonBase-root .MuiTableSortLabel-root .Mui-active': {
                color: '#fff',
              },
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const DogsTable = () => {
  const [openModal, setOpenModal] = useState(false) // this state is used to open the modal
  const [dogId, setDogId] = useState('') // this state is used to store the dog id
  const [page, setPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [rows, setRows] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const blApiUrl = process.env.VITE_BL_API_URL

  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue('Status', event.target.value)
  }

  const validateSchema = Yup.object({
    Status: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      setStatus(values.Status)
      setAnchorEl(null)
    },
  })

  const handleClick = (id: string) => {
    setDogId(id)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 5 - totalPages) : 0

  const visibleRows = React.useMemo(() => rows, [rows])

  const handleModal = (option: ModalOptions.Open | ModalOptions.Close) => {
    if (option === ModalOptions.Open) {
      setOpenModal(true)
    }
    if (option === ModalOptions.Close) {
      setOpenModal(false)
    }
  } // this function is used to handle the modal

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0)
    setSearch(e.target.value)
  }

  const closeFilter = () => {
    setAnchorEl(null)
  }

  const fetchDogs = useCallback(async () => {
    const response = await fetch(
      `${blApiUrl}/dogs?${search ? `name=${search}&` : ``}${
        status ? `status=${status}&` : ``
      }offset=${page * 5}&limit=5`
    )
    if (response.status === 200) {
      const data = await response.json()
      return data
    } else {
      return {
        dogs: [],
        total: 1,
      }
    }
  }, [page, search, status])

  useEffect(() => {
    fetchDogs().then((data) => {
      if (data.dogs) {
        setRows(data.dogs)
        setTotalPages(data.total)
      }
    })
  }, [fetchDogs])

  return (
    <>
      <Stack justifyContent="space-between" direction={'row'} mb="20px">
        <SearchInput onChange={handleSearch} />
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
          onClick={(e) => {
            setAnchorEl(e.currentTarget)
          }}
        >
          Filter
        </CustomButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closeFilter}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box
            sx={{
              width: '670px',
              borderTop: '8px solid #003D50',
              padding: '25px 50px 50px 50px',
            }}
          >
            <Typography
              sx={{ fontSize: '20px', paddingBottom: '12px' }}
              variant="h5"
            >
              Filter
            </Typography>

            <form
              onSubmit={formik.handleSubmit}
              style={{
                width: '95%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
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
            </form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                onClick={(e) => {
                  setStatus('')
                  setPage(0)
                  formik.resetForm()
                  setAnchorEl(null)
                }}
                sx={{ color: 'gray' }}
              >
                <Typography
                  sx={{ fontSize: '15px', textTransform: 'none' }}
                  variant="body1"
                >
                  Clear
                </Typography>
              </Button>
              <Box
                sx={{
                  'button ': {
                    minWidth: '100px',
                    padding: '10px 50px',
                    textTransform: 'none',
                    fontSize: '14px',
                  },
                }}
              >
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
                  onClick={(e) => {
                    formik.handleSubmit(e)
                    setAnchorEl(null)
                  }}
                >
                  Apply
                </CustomButton>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Stack>
      <TableContainer
        sx={{
          borderRadius: 1,
        }}
      >
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead />

          <TableBody>
            {visibleRows.length === 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" component="div">
                    No dogs found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {visibleRows.map((row: Dog, index: number) => {
              return (
                <TableRow
                  hover
                  onClick={() => handleClick(row.id.toString())}
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell
                    component="th"
                    id={index.toString()}
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    <CustomLink to={`/dog/${row.id}`}>{row.name}</CustomLink>
                  </TableCell>
                  <TableCell align="center">{row.breed}</TableCell>

                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Ellipsis>
                      <Button
                        onClick={() => {
                          handleModal(ModalOptions.Open)
                        }}
                        size="small"
                        fullWidth
                        sx={{
                          px: '10px',
                          textTransform: 'none',
                        }}
                      >
                        Delete
                      </Button>
                    </Ellipsis>
                  </TableCell>
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CommonModal
        open={openModal}
        gap={14}
        width={640}
        height={190}
        padding={'30px'}
        sxHeader={{
          marginTop: '0px',
        }}
        sxButtonsSection={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          margin: 'auto',
          gap: '0',
        }}
        handleClose={() => handleModal(ModalOptions.Close)}
        heading={'Delete confirmation?'}
        primaryButton={{
          label: 'Confirm',
          action: () => {
            fetch(`${blApiUrl}/dogs/${dogId}`, {
              method: 'DELETE',
            })
              .then(() => {
                setPage(0)
              })
              .catch((error) => {
                console.log(error)
              })
            handleModal(ModalOptions.Close)
          },
        }}
        secondaryButton={{
          label: 'Cancel',
          action: () => {
            handleModal(ModalOptions.Close)
          },
          sx: { marginRight: '18px' },
        }}
      >
        <Box>
          <Typography sx={{ margin: '20px auto' }}>
            Please note by selecting “confirm”, you will delete this dog
            information <span style={{ fontWeight: 'bold' }}>permanently</span>.
            Do you want to proceed?
          </Typography>
        </Box>
      </CommonModal>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalPages}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}}
      />
    </>
  )
}

export default DogsTable
