import React from 'react'
import Marque from "./marque.js"

class Tableau extends React.Component {
  constructor () {
    super()
    this.state = { n: 0 }
  }
  handleClick () {
    this.setState({ n: this.state.n + 1 })
  }
  render () {
    return  	(
      <div>
        <div id="tableau">
            <div id="hote" className="equipe">h</div>
            <Marque hote="22" visiteur="18"/>
            <div id="visiteur" className="equipe">v</div>
        </div>
      </div>)
  }
}

export default Tableau;
