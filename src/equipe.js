import React from 'react'

class Equipe extends React.Component {
  constructor (props) {
    super()
    //this.nom = props.nom;
  }
  render () {
    return  	(
      <div className="equipe" onClick={this.props.surPanier}>
        <div className="nom">{this.props.nom}</div>
        <img className="blason" src="public/img/ffbb-150-alt.png"></img>
      </div>
    )
  }
}

export default Equipe;
