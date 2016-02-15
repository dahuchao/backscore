import React from 'react'

var Equipe = React.createClass({
  render: function() {
    return (
      <div className="equipe" onClick={this.props.surPanier}>
        <div className="nom">{this.props.nom}</div>
        <img className="blason" src="img/ffbb-blason.png"></img>
      </div>
    )
  }
})

export default Equipe;
