import { HTMLProps } from 'react'
import { StyledBodyWrapper, StyledWrapper } from './styles'
import Header from '../../organism/header/Header'
import Footer from '../../molecules/footer/Footer'

function Layout({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <StyledWrapper>
      <Header />
      <StyledBodyWrapper>{children}</StyledBodyWrapper>
      <Footer />
    </StyledWrapper>
  )
}

export default Layout
