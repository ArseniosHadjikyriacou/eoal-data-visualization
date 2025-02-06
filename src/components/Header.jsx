import eoalLogo from "../images/eoal-logo.svg"
import diginnLogo from "../images/diginn-logo.png"
import '../styles/Header.css'

export default function Header() {
  return (
    <header>
      <a href="https://eoal.org.cy/" target="_blank" rel="noopener noreferrer">
        <img src={eoalLogo} alt="EOAL logo" className="eoal-logo"/>
      </a>
      <h1>εοαλ data visualization tool</h1>
      <a href="https://www.diginn.eu/" target="_blank" rel="noopener noreferrer">
        <img src={diginnLogo} alt="DiGiNN logo" className="diginn-logo"/>
      </a>
    </header>
  )
}