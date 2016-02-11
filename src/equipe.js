import React from 'react'

var Equipe = React.createClass({
  getInitialState: function() {
    return null
  },
  render: function() {
    return (
      <div className="equipe" onClick={this.props.surPanier}>
        <div className="nom">{this.props.nom}</div>
        <img className="blason" src="public/img/ffbb-150-alt.png"></img>
      </div>
    )
  }
})

export default Equipe;
