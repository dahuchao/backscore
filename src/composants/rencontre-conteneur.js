import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import store from '../store'
import * as types from '../actions/actions-types'
import request from 'request'
import Rencontre from "./rencontre"

const RencontreConteneur = React.createClass({
  componentDidMount: function () {
    const idRencontre = this.props.params.idRencontre
    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre
    console.info("Requete de l'API web: " + adresse)
    request(adresse, function (error, response, rencontre) {
      if (!error && response.statusCode == 200) {
        console.info("Chargement rencontre : " + rencontre)
        let oRencontre = JSON.parse(rencontre)
        store.dispatch({
          type: types.GET_RENCONTRE_SUCCESS,
          rencontre: oRencontre
        })
      }
    })
  },
  render: function () {
    return <Rencontre rencontre={this.props.rencontre}/>
  }
})
const mapStateToProps = function (store) {
  return {
    rencontre: store.rencontreState.rencontre
  }
}

export default connect(mapStateToProps)(RencontreConteneur)
