import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddDogForm from '../AddDogForm'
import { mockAddFormBLResponse, mockAddForm } from '../../../../__mocks__/mocks'

const mockUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}))

globalThis.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => mockAddFormBLResponse,
  })
})

describe('AddDogForm', () => {
  it('should render the form', () => {
    const { getByPlaceholderText, getByText } = render(<AddDogForm />)

    // Assert that the form elements are rendered
    expect(getByPlaceholderText('Dog Name')).toBeInTheDocument()
    expect(getByPlaceholderText('Breed')).toBeInTheDocument()
    expect(getByPlaceholderText('Age')).toBeInTheDocument()
    expect(getByText('Save')).toBeInTheDocument()
  })

  it('failed test', async () => {
    render(<AddDogForm />)
    const saveButton = screen.getByText('Save')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getAllByText('Required')).toHaveLength(4)
    })
  })

  it('should submit the form', async () => {
    render(<AddDogForm />)
    const saveButton = screen.getByText('Save')

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Dog Name'), {
      target: { value: mockAddForm.name },
    })
    fireEvent.change(screen.getByPlaceholderText('Breed'), {
      target: { value: mockAddForm.breed },
    })
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: mockAddForm.age },
    })

    const selectButton = screen.getAllByRole('combobox')[0]
    await userEvent.click(selectButton)
    screen.getByText('Adopted')
    const itemClickable = screen.getByText('Adopted')
    await userEvent.click(itemClickable)
    // Submit the form
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockUsedNavigate).toHaveBeenCalled()
    })
  })
})
