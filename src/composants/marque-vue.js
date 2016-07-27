import React from 'react'

var Marque = React.createClass({
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
