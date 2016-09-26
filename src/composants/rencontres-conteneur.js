import React from "react"
import { connect } from "react-redux"
import store from "../store"
import * as types from "../actions/actions-types"
import request from "request"
import Rencontres from "./rencontres"
import RencontreAjout from "./rencontres-ajout"

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
  ajouterRencontre: function () {
    console.log("Ajouter rencontre.")
    store.dispatch({
      type: types.AJOUTER_RENCONTRE
    })
  },
  ajoutRencontre: function (infos) {
    let rencontre = this.props.rencontre
    console.info("Info: " + JSON.stringify(infos))
    rencontre.date = infos.date
    rencontre.hote.nom = infos.hote
    rencontre.visiteur.nom = infos.visiteur
    console.log("Ajout rencontre : " + JSON.stringify(rencontre))
    var adresse = location.protocol + "//" + location.host + "/api/rencontres"
    console.info("Requete de l'API web: " + adresse)
    request({ url: adresse, method: "POST", json: rencontre }, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Rencontre créée :")
        store.dispatch({
          type: types.POST_RENCONTRE_SUCCESS,
          rencontre: rencontre
        })
      }
    })
  },
  render: function () {
    return (
      <div>
        <Rencontres rencontres={this.props.rencontres} ajouterRencontre={this.ajouterRencontre}/>
        {
          this.props.modeAjout ? <RencontreAjout rencontre={this.props.rencontre} ajoutRencontre={this.ajoutRencontre}/> : null
        }
      </div>
    )
  }
})

const mapStateToProps = function (store) {
  console.log("Etat du magasin : " + JSON.stringify(store.rencontreState))
  return {
    rencontres: store.rencontreState.rencontres,
    rencontre: store.rencontreState.rencontre,
    modeAjout: store.rencontreState.modeAjout
  }
}

export default connect(mapStateToProps)(RencontresConteneur);
