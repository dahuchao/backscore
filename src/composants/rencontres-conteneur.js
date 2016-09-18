import React from "react"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontre-ajout"

const RencontresConteneur = React.createClass({
  componentDidMount: function () {
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontres) {
      if (!error && response.statusCode == 200) {
        console.info("Initialisation des rencontres " + rencontres)
        let oRencontres = JSON.parse(rencontres)
        store.dispatch({
          type: types.GET_RENCONTRES_SUCCESS,
          rencontres: oRencontres
        })
      }
    })
  },
  ajoutRencontre: function () {
    console.log("Ajout rencontre : " + JSON.stringify(this.props.rencontre))
    store.dispatch({
      type: types.POST_RENCONTRE_SUCCESS,
      rencontre: this.props.rencontre
    })
  },

  render: function () {
    return (
      <div>
        <Rencontres rencontres={this.props.rencontres}/>
        <RencontreAjout rencontre={this.props.rencontre}  ajoutRencontre={this.ajoutRencontre}/>
      </div>
    )
  }
})

const mapStateToProps = function (store) {
  console.log("Etat du magasin : " + JSON.stringify(store.rencontreState))
  return {
    rencontres: store.rencontreState.rencontres,
    rencontre: store.rencontreState.rencontre
  }
}

export default connect(mapStateToProps)(RencontresConteneur);
