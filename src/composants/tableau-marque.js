import React from "react"
import store from "../store"
import * as types from "../actions/actions-types"

export default React.createClass({
  surPeriode(periode) {
    this.props.surPeriode(periode)
  },
  render() {
    console.debug("Conteneur4.")
    console.debug("Rencontre: " + JSON.stringify(this.props.rencontre))
    return (
      <div id="marque">
        <div id="periodes">{
          [1, 2, 3, 4].map(periode => {
            let style = periode == this.props.rencontre.periode ? 
            { color: "red" } : 
            { color: "white" }
            return (
              <span
                className="periode"
                style={style}
                key={periode}
                onClick={ this.surPeriode.bind(this, periode) }>
                P{periode}
              </span>)
          })
        }
        </div>
        <div className="compteur">
          <span className="hote"
            onClick={this.props.surCorrectionHote}>{this.props.rencontre.hote.marque}</span>-
          <span className="visiteur"
            onClick={this.props.surCorrectionVisiteur}>{this.props.rencontre.visiteur.marque}</span>
        </div>
      </div>
    )
  }
})

