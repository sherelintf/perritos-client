/* eslint-disable @typescript-eslint/no-explicit-any */

import { HTMLProps } from 'react'
import {Loader, StyledButton} from './styles'

export const Button = ({
  id,
  outline,
  secondary,
  children,
  disabled,
  small,
  text,
  dark,
  sx,
  sxLoader,
  onClick,
  testId,
  fullWidth,
  isLoading = false,
  type = 'submit',
}: ButtonProps) => {
  return (
    <StyledButton
      id={id}
      type={type}
      small={small}
      text={text}
      dark={dark}
      outline={outline}
      secondary={secondary}
      disabled={disabled || isLoading}
      style={sx}
      onClick={onClick}
      data-testid={testId}
      fullWidth={fullWidth}
    >
      {isLoading ? (
        <Loader className="loader" style={sxLoader} />
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  )
}

export type ButtonProps = HTMLProps<HTMLButtonElement> &
  HTMLProps<HTMLAnchorElement> & {
    /**
     * Alternative styles for the button
     */
    secondary?: boolean
    /**
     * Define if the button is small or not
     */
    small?: boolean
    /**
     * Define a button without fill color
     */
    outline?: boolean
    /**
     * Disable button
     */
    disabled?: boolean
    /**
     * Text type button without fill and borders
     */
    text?: boolean
    /**
     * Dark text type button variation
     */
    dark?: boolean
    /**
     * Custom styles
     */
    sx?: object
    /**
     * Custom styles for loading spinner
     */
    sxLoader?: object
    /**
     * Optional click handler
     */
    onClick?: (e?: any) => void
    /**
     * Shows the loading spinner
     */
    isLoading?: boolean
    /**
     * Optional testId
     */
    testId?: string
    /**
     * Optional fullWidth
     */
    fullWidth?: boolean
    /**
     * Optional type
     */
    type?: 'button' | 'submit' | 'reset' | undefined
    /**
     * Optional id
     */
    id?: string
  }
