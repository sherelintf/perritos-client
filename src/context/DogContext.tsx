/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, FC, useState } from 'react'
import PropTypes from 'prop-types'
import { Dog } from '../types/DogType'
import { Owner } from '../types/OwnerType'

type DogContextType = {
  dog: Dog
  setDog: React.Dispatch<React.SetStateAction<Dog>>
  clearDog: () => void
  owner: Owner
  setOwner: React.Dispatch<React.SetStateAction<Owner>>
  clearOwner: () => void
}

export const DogContext:React.Context<any> = createContext({} as DogContextType)

export const DogProvider: FC<any> = ({ children }) => {
  const [dog, setDog] = useState<Dog>({} as Dog)
  const [owner, setOwner] = useState<Owner>({} as Owner)

  const clearDog = () => {
    setDog({} as Dog)
  }

  const clearOwner = () => {
    setOwner({} as Owner)
  }

  return (
    <DogContext.Provider
      value={{
        dog,
        setDog,
        owner,
        setOwner,
        clearDog,
        clearOwner,
      }}
    >
      {children}
    </DogContext.Provider>
  )
}


DogProvider.propTypes = {
  children: PropTypes.node,
}
