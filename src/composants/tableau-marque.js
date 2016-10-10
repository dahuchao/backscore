import React from "react"
import store from "../store"
import * as types from "../actions/actions-types"

export default React.createClass({
  surPeriode(periode) {
    this.props.rencontre.periode = periode
    console.debug("Nouvelle periode: " + JSON.stringify(rencontre))
    store.dispatch({
      type: types.NOUVELLE_PERIODE,
      rencontre: rencontre
    })
  },
  render() {
    const actif = "red"
    const inactif = "white"
    let styleP1 = { color: actif }
    let styleP2 = { color: inactif }
    let styleP3 = { color: inactif }
    let styleP4 = { color: inactif }
    let periodes = [1, 2, 3, 4]
    return (
      <div id="marque">
        <div id="periodes">{
          periodes.map(periode => {
            console.log("Periode: " + periode)
            return (<span
              key={periode}
              style={styleP2}
              className="periode"
              onClick={this.surPeriode.bind(this, periode) }>P{periode}</span>)
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

