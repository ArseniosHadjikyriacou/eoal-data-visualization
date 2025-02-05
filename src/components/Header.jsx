import eoalLogo from "../images/eoal-logo.svg"
import diginnLogo from "../images/diginn-logo.png"
import '../styles/Header.css'

export default function Header() {
  return (
    <header>
      <img src={eoalLogo} alt="EOAL logo" className="eoal-logo"/>
      <h1>εοαλ data visualization tool</h1>
      <img src={diginnLogo} alt="DiGiNN logo" className="diginn-logo"/>
    </header>
  )
}