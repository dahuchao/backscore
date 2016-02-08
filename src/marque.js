import React from 'react'

class Marque extends React.Component {
  constructor (props) {
    super()
    this.state = { hote: props.hote, visiteur: props.visiteur }
  }
  panierClick () {
    this.setState({ hote: this.state.hote + 1 })
  }
  render () {
    return  	(
        <div id="marque">
          <div className="compteur">
            <span onClick={this.panierClick.bind(this)} className="hote">{this.state.hote}</span>-
            <span className="visiteur">{this.state.visiteur}</span>
          </div>
        </div>
      )
  }
}

export default Marque;
