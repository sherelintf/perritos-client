/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DogInfo from '../DogInfo'
import {
  mockEditFormBLResponse,
  mockEditForm,
} from '../../../../__mocks__/mocks'
import { DogContext } from '../../../../context/DogContext'
jest.mock('../../../../context/DogContext.tsx')

globalThis.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => mockEditFormBLResponse,
  })
})

describe('DogInfo', () => {
  beforeEach(() => {
    DogContext.implementation = jest.fn(() => ({
      setDogs: jest.fn(),
    }))
  })
  it('should render the form', async () => {
    let dog = {
      id: 1,
      name: 'test',
      breed: 'test',
      age: 1,
      status: 'NotAdopted',
      OwnerId: 1,
      imageUrl: 'test',
    }
    render(<DogInfo dog={dog} />)

    const nameInput = await screen.findByText('Dog Name')
    const breedInput = await screen.findByText('Breed')
    const ageInput = await screen.findByText('Age')
    const editButton = await screen.findAllByTestId('editDogInfo')

    // Assert that the form elements are rendered

    expect(nameInput).toBeInTheDocument()
    expect(breedInput).toBeInTheDocument()
    expect(ageInput).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()

    expect(nameInput).toHaveValue(dog.name)
    expect(breedInput).toHaveValue(dog.breed)
    expect(ageInput).toHaveValue(dog.age)
  })

  /*   it('failed test', async () => {
    const dog = {
      id: 1,
      name: 'test',
      breed: 'test',
      age: 1,
      status: 'NotAdopted',
    }

    render(<DogInfo {...dog} />)

    const EditButton = screen.getByType('button')
    const saveButton = screen.getByText('Save')

    fireEvent.click(EditButton)
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getAllByText('Required')).toHaveLength(4)
    })
  })

  it('should submit the form', async () => {
    const dog = {
      id: 1,
      name: 'test',
      breed: 'test',
      age: 1,
      status: 'NotAdopted',
    }

    render(<DogInfo {...dog} />)
    const saveButton = screen.getByText('Save')

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Dog Name'), {
      target: { value: mockEditForm.name },
    })
    fireEvent.change(screen.getByPlaceholderText('Breed'), {
      target: { value: mockEditForm.breed },
    })
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: mockEditForm.age },
    })

    const selectButton = screen.getAllByRole('combobox')[0]
    await userEvent.click(selectButton)
    screen.getByText('Adopted')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Dog updated successfully')).toBeInTheDocument()
    })
  }) */
})
