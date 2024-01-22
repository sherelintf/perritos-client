import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import { DogProvider } from './context/DogContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DogProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DogProvider>
    </ThemeProvider>
  </React.StrictMode>
)
