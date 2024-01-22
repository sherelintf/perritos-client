import { CSSProperties, ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type ButtonProps = {
  label: string
  action: () => void
  disabled?: boolean
  sx?: CSSProperties
  buttonId?: string
}

type ModalProps =
  | {
      id?: string
      heading: string
      open: boolean
      handleClose: () => void
      children?: JSX.Element
      top?: boolean
      sxHeader?: CSSProperties
      sxBodySection?: CSSProperties
      sxButtonsSection?: CSSProperties
      sxModalWrapper?: CSSProperties
      justifyContent?: string
      alignItems?: string
      padding?: string | number
      gap?: string | number
      height?:
        | number
        | `${number}${'px' | 'vw' | 'vh' | 'em' | 'pt' | 'vmax' | 'vmin' | '%'}`
      maxHeight?:
        | number
        | `${number}${'px' | 'vw' | 'vh' | 'em' | 'pt' | 'vmax' | 'vmin' | '%'}`
      maxWidth?:
        | number
        | `${number}${'px' | 'vw' | 'vh' | 'em' | 'pt' | 'vmax' | 'vmin' | '%'}`
      width?:
        | number
        | `${number}${'px' | 'vw' | 'vh' | 'em' | 'pt' | 'vmax' | 'vmin' | '%'}`
    } & (
      | {
          isFormModal?: false | never
          primaryButton?: ButtonProps
          secondaryButton?: never
          submitButton?: never
        }
      | {
          isFormModal?: false | never
          primaryButton: ButtonProps
          secondaryButton: ButtonProps
          submitButton?: never
        }
      | {
          isFormModal: true
          primaryButton?: never
          submitButton: {
            label: string
            submitHandler: () => void
            disabled?: boolean
            sx?: CSSProperties
            buttonId?: string
          }
          secondaryButton?: ButtonProps
        }
    )

type ModalWrapperProps = {
  children: ReactNode
  isFormModal: boolean
  submitHandler?: () => void
  style?: CSSProperties
}

const ModalWrapper = ({
  children,
  isFormModal,
  submitHandler,
  style,
}: ModalWrapperProps) =>
  isFormModal ? (
    <form style={style} id="formformform" onSubmit={submitHandler}>
      {children}
    </form>
  ) : (
    <Box style={style}>{children}</Box>
  )

export default function CommonModal({
  id,
  heading,
  open,
  handleClose,
  children,
  primaryButton,
  secondaryButton,
  width,
  maxWidth,
  height,
  justifyContent,
  alignItems,
  padding,
  submitButton,
  isFormModal,
  sxHeader,
  sxBodySection,
  sxButtonsSection,
  sxModalWrapper,
  top = true,
  maxHeight,
  gap,
}: ModalProps) {
  return (
    <Dialog
      sx={{
        paddingTop: '45px',
      }}
      onClose={handleClose}
      open={open}
      id={id}
      PaperProps={{
        style: {
          maxWidth: maxWidth ?? '500px',
          width: width ?? '95%',
          padding: padding ?? 25,
          position: 'relative',
          height: height ?? 'auto',
          justifyContent: justifyContent ?? 'center',
          alignItems: alignItems ?? 'center',
          maxHeight: maxHeight,
          overflowX: 'hidden',
          overflowY: 'hidden',
        },
      }}
    >
      {/* add a div a primary color top border to the modal */}
      {top && (
        <div
          style={{
            height: '0.4rem',
            width: '100%',
            backgroundColor: '#003D50',
            top: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      )}
      <ModalWrapper
        isFormModal={!!isFormModal}
        submitHandler={submitButton?.submitHandler}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: gap ?? 20,

          borderTop: '2rem',
          borderColor: 'blue',
          ...sxModalWrapper,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={'bold'}
            component="h2"
            sx={{ ...sxHeader }}
          >
            {heading}
          </Typography>
          <Divider light style={{ marginTop: 10 }} />
        </Box>

        <Box sx={{ ...sxBodySection }}>{children}</Box>

        <Grid
          display="flex"
          justifyContent="center"
          gap={3}
          item
          xs
          md={12}
          sx={{ ...sxButtonsSection }}
        >
          {secondaryButton && (
            <Button
              size="medium"
              style={{
                color: '#003D50',
                padding: '3px 30px',
                marginRight: '12px',
                border: '1px #003D50 solid',
                textTransform: 'none',
                ...secondaryButton.sx,
              }}
              variant="text"
              onClick={secondaryButton.action}
            >
              {secondaryButton.label}
            </Button>
          )}
          {(primaryButton || submitButton) && (
            <Button
              id={primaryButton?.buttonId || submitButton?.buttonId}
              type={isFormModal ? 'submit' : 'button'}
              size="medium"
              disabled={submitButton?.disabled}
              style={{
                padding: '3px 30px',
                backgroundColor: '#003D50',
                color: 'white',
                textTransform: 'none',
                opacity: submitButton?.disabled ? 0.7 : 1,
                ...submitButton?.sx,
                ...primaryButton?.sx,
              }}
              variant="contained"
              onClick={primaryButton?.action}
            >
              {primaryButton?.label ?? submitButton?.label}
            </Button>
          )}
        </Grid>
      </ModalWrapper>
    </Dialog>
  )
}
