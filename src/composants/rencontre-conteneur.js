import React from "react"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontre from "./rencontre"

const RencontreConteneur = React.createClass({
  componentDidMount: function () {
    const idRencontre = this.props.params.idRencontre
    let adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        let oRencontre = JSON.parse(rencontre)
        store.dispatch({
          type: types.GET_RENCONTRE_SUCCESS,
          rencontre: oRencontre
        })
      }
    })
  },
  sauver: function (infos) {
    let rencontre = this.props.rencontre
    rencontre.date = infos.date
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.props.rencontre.id
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "PUT", json: rencontre }, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Rencontre modifiée :" + rencontre)
        store.dispatch({
          type: types.PUT_RENCONTRE_SUCCESS,
          rencontre: rencontre
        })
      }
    })
  },
  editer: function () {
    store.dispatch({
      type: types.EDITER_RENCONTRE
    })
  },
  render: function () {
    return (
      !this.props.rencontre ? null :
        <Rencontre
          rencontre={this.props.rencontre}
          editer={this.editer}
          sauver={this.sauver}
          modeEdition={this.props.modeEdition} />
    )
  }
})
const mapStateToProps = function (store) {
  return {
    rencontre: store.rencontreState.rencontre,
    modeEdition: store.rencontreState.modeEdition
  }
}

export default connect(mapStateToProps)(RencontreConteneur)
