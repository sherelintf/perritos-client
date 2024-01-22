import {IconButton, Menu, MenuItem} from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'

type Props = {
  children: React.ReactNode
}
type CustomMenuItemProps = {
  children: React.ReactNode
  onClick: () => void
  key?: string
}

export default function Ellipsis({children}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
          disablePadding: true,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          padding: '0 !important',
        }}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}

export const CustomMenuItem = ({
  children,
  onClick,
  key = 'menuItem',
}: CustomMenuItemProps) => {
  return (
    <MenuItem
      sx={{
        paddingY: '0 !important',
        paddingX: '0 !important',
        paddingRight: '0 !important',
      }}
      key={key}
      selected={false}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  )
}
