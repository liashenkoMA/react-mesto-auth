import Logo from '../images/logo.svg'

export function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Логотип сайта" className="logo" />
    </header>
  )
}