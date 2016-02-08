import React from 'react'

class Marque extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hote: props.hote,
      visiteur: props.visiteur
    }
    this.surCorrection = props.surCorrection;
  }
  panierClick() {
    this.setState({
      hote: this.state.hote + 1
    })
  }
  render() {
    return (
      <div id="marque">
        <div className="compteur">
          <span className="hote" onClick={this.surCorrection}>{this.state.hote}</span>-
          <span className="visiteur">{this.state.visiteur}</span>
        </div>
      </div>
    )
  }
}

export default Marque;
