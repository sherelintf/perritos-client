import styled from '@emotion/styled'
import {ButtonProps} from './Buttons'
import { keyframes} from '@emotion/react'

export const StyledButton = styled('button')<ButtonProps>(
  (props) => ({
    font: 'Roboto, Helvetica, Arial, sans-serif;',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '0.5rem',
    padding: '20px 20px',
    appearance: 'none',
    color: 'white',
    fontSize: '16px',
    lineHeight: '1',
    textDecoration: 'none',
    cursor: 'pointer',
    minHeight: '58px',
    borderRadius: '6px',
    border: 'none',
    '&:hover': {
      transition: 'colors 0.5s ease-in-out',
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: props.disabled ? '0.7' : '1',
      backgroundColor: '#CACDCD',
    },
  }),

  (props) =>
    props.outline
      ? {
          color: !props.secondary ? '#003D50' : '#226CA5',
          borderColor: !props.secondary ? '#003D50' : '#226CA5',
          background: 'transparent',
          border: `1px solid #003D50`,
          '&:hover': {
            opacity: '80%',
          },
        }
      : props.secondary
      ? {
          borderColor: '#226CA5',
          backgroundColor: '#226CA5',
          color: 'white',
          '&:hover': {
            opacity: '90%',
          },
        }
      : props.text
      ? {
          paddingInline: '0',
          textDecoration: 'underline',
          textDecorationColor: '#003D50',
          textUnderlinePosition: 'under',
          border: 'none',
          backgroundColor: 'transparent',
          color: props.dark ? 'white' : '#9ca3af',
          '&:hover': {
            background: 'none',
            border: 'none',
            color: '#003D50',
            textDecorationColor: '#003D50',
          },
        }
      : props.disabled
      ? {
          '&:disabled': {
            background: props.isLoading ? '#9ca3af' : '#003D50',
            border: `1px solid ##6b7280`,
          },
        }
      : {
          borderColor: '#003D50',
          backgroundColor: '#003D50',
          color: 'white',
          '&:hover': {
            opacity: '90%',
          },
        },
  (props) =>
    props.small && {
      minHeight: '2rem',
      padding: `0.5rem 1.5rem`,
    },
  (props) => props.fullWidth && {width: '100%'},
)

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`

export const Loader = styled('span')({
  width: '30px',
  height: '30px',
  border: '4px solid #fff',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: `${rotation} 1s linear infinite`,
  position: 'absolute',
})
