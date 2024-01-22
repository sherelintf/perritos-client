import { Box, AppBar, IconButton, Typography } from '@mui/material'
import { StyledHeaderToolbar } from './styles'
import { AccountCircle } from '@mui/icons-material'

import LogoComponent from '../../atoms/logo/Logo'

function Header() {
  const HeaderSidebar = () => {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="subtitle2"
          noWrap
          component="span"
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <p>
            Welcome, <b>Sherelin</b>
          </p>
        </Typography>
        <IconButton
          size="small"
          edge="end"
          aria-label="user account"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      </Box>
    )
  }
  return (
    <AppBar elevation={4} position="relative">
      <StyledHeaderToolbar sx={{ flexWrap: 'wrap' }}>
        <LogoComponent />
        <Box sx={{ flex: 1 }} />
        <HeaderSidebar />
      </StyledHeaderToolbar>
    </AppBar>
  )
}

export default Header
