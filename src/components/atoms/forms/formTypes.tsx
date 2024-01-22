/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from 'react'

type FormsTypes = HTMLProps<HTMLInputElement> & {
  /**
   * Input label
   */
  label?: string
  /**
   * Defines if the input value is valid or not
   */
  valid?: boolean
  /**
   * Prop for the form controller
   */
  register?: any
}

type WrapperProps = {
  /**
   * Define if the input will have full width of the parent
   */
  fullWidth?: boolean
  /**
   * Show or not show the borders
   */
  showBorder?: boolean
  /**
   * Display label to the right
   */
  labelRight?: boolean
  /**
   * Set the input in a small size
   */
  small?: boolean
  /**
   *
   */
  space?: boolean
}

export { FormsTypes, WrapperProps }
