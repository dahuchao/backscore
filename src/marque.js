import React from 'react'

var Marque = React.createClass({
  getInitialState: function() {
    console.info("Création du tableau de marque: " + this.props.hote);
    //var idRencontre = this.props.idRencontre;
    var marque = {
      hote: this.props.hote,
      visiteur: this.props.visiteur
    }
    return marque;
  },
  render: function() {
    return (
      <div id="marque">
        <div className="compteur">
          <span className="hote" onClick={this.props.surCorrectionHote}>{this.props.hote}</span>-
          <span className="visiteur" onClick={this.props.surCorrectionVisiteur}>{this.props.visiteur}</span>
        </div>
      </div>
    );
  }
})

export default Marque;
