import { StyledLogo, StyledLogoWrapper } from './styles'
import Logo from '../../../assets/logo.png'

const LogoComponent = () => {
  return (
    <StyledLogoWrapper>
      <StyledLogo onClick={() => {}} src={`${Logo}`} alt={'Control Risks'} />
    </StyledLogoWrapper>
  )
}

export default LogoComponent
